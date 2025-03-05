import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertQuizResponseSchema, insertChatMessageSchema, insertDiscussionPostSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Quiz routes
  app.post("/api/quiz", async (req, res) => {
    try {
      const data = insertQuizResponseSchema.parse(req.body);
      const response = await storage.addQuizResponse(data);
      res.json(response);
    } catch (error) {
      res.status(400).json({ error: "Invalid quiz response data" });
    }
  });

  app.get("/api/quiz", async (_req, res) => {
    const responses = await storage.getQuizResponses();
    res.json(responses);
  });

  // Chat routes
  app.post("/api/chat", async (req, res) => {
    try {
      const data = insertChatMessageSchema.parse(req.body);
      const message = await storage.addChatMessage(data);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid chat message data" });
    }
  });

  app.get("/api/chat", async (_req, res) => {
    const history = await storage.getChatHistory();
    res.json(history);
  });

  // Discussion routes
  app.post("/api/discussion", async (req, res) => {
    try {
      const data = insertDiscussionPostSchema.parse(req.body);
      const post = await storage.addDiscussionPost(data);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid discussion post data" });
    }
  });

  app.get("/api/discussion", async (_req, res) => {
    const posts = await storage.getDiscussionPosts();
    res.json(posts);
  });

  return createServer(app);
}
