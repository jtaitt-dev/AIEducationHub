import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quizResponses = pgTable("quiz_responses", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  isUser: boolean("is_user").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const discussionPosts = pgTable("discussion_posts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({ id: true });
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, timestamp: true });
export const insertDiscussionPostSchema = createInsertSchema(discussionPosts).omit({ id: true, timestamp: true });

export type QuizResponse = typeof quizResponses.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type DiscussionPost = typeof discussionPosts.$inferSelect;

export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type InsertDiscussionPost = z.infer<typeof insertDiscussionPostSchema>;
