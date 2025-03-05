import { 
  type QuizResponse, type InsertQuizResponse,
  type ChatMessage, type InsertChatMessage,
  type DiscussionPost, type InsertDiscussionPost 
} from "@shared/schema";

export interface IStorage {
  // Quiz methods
  addQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  getQuizResponses(): Promise<QuizResponse[]>;
  
  // Chat methods
  addChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(): Promise<ChatMessage[]>;
  
  // Discussion methods
  addDiscussionPost(post: InsertDiscussionPost): Promise<DiscussionPost>;
  getDiscussionPosts(): Promise<DiscussionPost[]>;
}

export class MemStorage implements IStorage {
  private quizResponses: Map<number, QuizResponse>;
  private chatMessages: Map<number, ChatMessage>;
  private discussionPosts: Map<number, DiscussionPost>;
  private currentIds: { quiz: number; chat: number; discussion: number };

  constructor() {
    this.quizResponses = new Map();
    this.chatMessages = new Map();
    this.discussionPosts = new Map();
    this.currentIds = { quiz: 1, chat: 1, discussion: 1 };
  }

  async addQuizResponse(response: InsertQuizResponse): Promise<QuizResponse> {
    const id = this.currentIds.quiz++;
    const timestamp = new Date();
    const quizResponse = { ...response, id, timestamp };
    this.quizResponses.set(id, quizResponse);
    return quizResponse;
  }

  async getQuizResponses(): Promise<QuizResponse[]> {
    return Array.from(this.quizResponses.values());
  }

  async addChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentIds.chat++;
    const timestamp = new Date();
    const chatMessage = { ...message, id, timestamp };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getChatHistory(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values());
  }

  async addDiscussionPost(post: InsertDiscussionPost): Promise<DiscussionPost> {
    const id = this.currentIds.discussion++;
    const timestamp = new Date();
    const discussionPost = { ...post, id, timestamp };
    this.discussionPosts.set(id, discussionPost);
    return discussionPost;
  }

  async getDiscussionPosts(): Promise<DiscussionPost[]> {
    return Array.from(this.discussionPosts.values());
  }
}

export const storage = new MemStorage();
