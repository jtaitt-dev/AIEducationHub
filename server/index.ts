import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "net";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to find an available port
const findAvailablePort = (startPort: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(startPort, "0.0.0.0", () => {
      const { port } = server.address() as { port: number };
      server.close(() => resolve(port));
    });

    server.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        findAvailablePort(startPort + 1)
          .then(resolve)
          .catch(reject);
      } else {
        reject(err);
      }
    });
  });
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add health check endpoint for cloud run
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Request logging middleware with performance tracking
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    console.time('Server Startup');
    log('Starting server initialization...');

    // Find an available port first
    const port = await findAvailablePort(5000);
    log(`Found available port: ${port}`);

    // Setup routes and error handling
    log('Registering routes...');
    const server = await registerRoutes(app);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error('Server error:', err);
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    });

    // Start server first
    await new Promise<void>((resolve) => {
      server.listen({
        port,
        host: "0.0.0.0",
        reusePort: true,
      }, () => {
        log(`Server listening on port ${port}`);
        resolve();
      });
    });

    // Setup static serving
    log('Setting up static serving...');
    if (process.env.NODE_ENV !== "production") {
      try {
        await setupVite(app, server);
        log('Vite setup complete');
      } catch (error) {
        console.error('Failed to setup Vite:', error);
        // Fallback to static serving if Vite setup fails
        app.use(express.static(path.resolve(__dirname, '../dist/public')));
        log('Fallback to static serving from dist/public');
      }
    } else {
      app.use(express.static(path.resolve(__dirname, '../dist/public')));
      log('Static serving enabled from dist/public');
    }

    console.timeEnd('Server Startup');
    log(`Server ready on port ${port}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();