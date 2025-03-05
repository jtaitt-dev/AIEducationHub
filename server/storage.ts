import { 
  type QuizResponse, type InsertQuizResponse,
  type ChatMessage, type InsertChatMessage,
  type DiscussionPost, type InsertDiscussionPost,
  type PromptSuggestion, type InsertPromptSuggestion 
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

  // Prompt suggestion methods
  addPromptSuggestion(suggestion: InsertPromptSuggestion): Promise<PromptSuggestion>;
  getPromptSuggestions(category?: string): Promise<PromptSuggestion[]>;
  updatePromptUsage(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private quizResponses: Map<number, QuizResponse>;
  private chatMessages: Map<number, ChatMessage>;
  private discussionPosts: Map<number, DiscussionPost>;
  private promptSuggestions: Map<number, PromptSuggestion>;
  private currentIds: { 
    quiz: number; 
    chat: number; 
    discussion: number;
    promptSuggestion: number;
  };

  constructor() {
    this.quizResponses = new Map();
    this.chatMessages = new Map();
    this.discussionPosts = new Map();
    this.promptSuggestions = new Map();
    this.currentIds = { 
      quiz: 1, 
      chat: 1, 
      discussion: 1,
      promptSuggestion: 1
    };
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

  async addPromptSuggestion(suggestion: InsertPromptSuggestion): Promise<PromptSuggestion> {
    const id = this.currentIds.promptSuggestion++;
    const timestamp = new Date();
    const promptSuggestion = { 
      ...suggestion, 
      id, 
      useCount: 0,
      lastUsed: timestamp 
    };
    this.promptSuggestions.set(id, promptSuggestion);
    return promptSuggestion;
  }

  async getPromptSuggestions(category?: string): Promise<PromptSuggestion[]> {
    const suggestions = Array.from(this.promptSuggestions.values());
    if (category) {
      return suggestions.filter(s => s.category === category);
    }
    return suggestions;
  }

  async updatePromptUsage(id: number): Promise<void> {
    const suggestion = this.promptSuggestions.get(id);
    if (suggestion) {
      this.promptSuggestions.set(id, {
        ...suggestion,
        useCount: suggestion.useCount + 1,
        lastUsed: new Date()
      });
    }
  }
}

export const storage = new MemStorage();