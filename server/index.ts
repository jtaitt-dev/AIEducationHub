import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { log, setupVite } from "./vite";
import path from "path";
import { fileURLToPath } from "url";

// ESM dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
      log(logLine);
    }
  });

  next();
});

const startServer = async (retries = 3) => {
  try {
    console.time('Server Startup');
    log('Starting server initialization...');

    const port = 5000;
    log(`Using port: ${port}`);

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

    // Start server with explicit error handling and retry logic
    try {
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Server startup timeout'));
        }, 5000);

        server.listen({
          port,
          host: "0.0.0.0",
        }, () => {
          clearTimeout(timeout);
          log(`Server listening on port ${port}`);
          resolve();
        }).on('error', (err: NodeJS.ErrnoException) => {
          clearTimeout(timeout);
          reject(err);
        });
      });

      // Setup Vite in development mode
      if (process.env.NODE_ENV !== "production") {
        log('Setting up Vite for development...');
        await setupVite(app, server);
        log('Vite setup complete');
      } else {
        // In production, serve static files from the dist directory
        const publicPath = path.resolve(__dirname, '../dist/public');
        log(`Setting up static serving from: ${publicPath}`);
        app.use(express.static(publicPath));

        // Add SPA fallback route for client-side routing
        app.get('*', (req, res) => {
          res.sendFile(path.join(publicPath, 'index.html'));
        });
        log('Static serving enabled');
      }

      console.timeEnd('Server Startup');
      log('Server startup complete');

    } catch (err: any) {
      if (err.code === 'EADDRINUSE' && retries > 0) {
        log(`Port ${port} in use, killing existing process and retrying...`);
        // Wait briefly before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        return startServer(retries - 1);
      }
      throw err;
    }

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle cleanup
process.on('SIGTERM', () => {
  log('Received SIGTERM signal, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  log('Received SIGINT signal, shutting down gracefully');
  process.exit(0);
});

startServer();