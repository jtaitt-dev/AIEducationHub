import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromptSuggestion {
  id: number;
  category: string;
  prompt: string;
  context?: string;
}

interface PromptSuggestionsProps {
  currentCategory?: string;
  onSuggestionSelect: (prompt: string) => void;
}

export function PromptSuggestions({ currentCategory, onSuggestionSelect }: PromptSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<PromptSuggestion[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll generate contextual suggestions based on category
    const generateSuggestions = () => {
      if (!currentCategory) return [];

      const commonSuggestions = [
        { id: 1, category: currentCategory, prompt: "Can you explain this in simpler terms?" },
        { id: 2, category: currentCategory, prompt: "Could you provide more examples?" },
        { id: 3, category: currentCategory, prompt: "What are some best practices for this?" }
      ];

      const categorySpecificSuggestions: Record<string, PromptSuggestion[]> = {
        email: [
          { id: 4, category: "email", prompt: "How do I make this email more professional?" },
          { id: 5, category: "email", prompt: "Can you add a follow-up section?" },
          { id: 6, category: "email", prompt: "How do I make the tone more friendly?" },
          { id: 7, category: "email", prompt: "Can you suggest a good subject line?" }
        ],
        excel: [
          { id: 8, category: "excel", prompt: "How can I make this formula more efficient?" },
          { id: 9, category: "excel", prompt: "What are some common errors to watch out for?" },
          { id: 10, category: "excel", prompt: "Can you show me how to protect the formula?" },
          { id: 11, category: "excel", prompt: "How do I handle errors in this formula?" }
        ],
        python: [
          { id: 12, category: "python", prompt: "How can I optimize this code?" },
          { id: 13, category: "python", prompt: "What are some alternative approaches?" },
          { id: 14, category: "python", prompt: "How do I handle potential errors?" },
          { id: 15, category: "python", prompt: "Can you explain the imports needed?" }
        ],
        sql: [
          { id: 16, category: "sql", prompt: "How can I improve query performance?" },
          { id: 17, category: "sql", prompt: "What indexes should I consider?" },
          { id: 18, category: "sql", prompt: "How do I handle NULL values?" },
          { id: 19, category: "sql", prompt: "Can you show me how to add error handling?" }
        ],
        regex: [
          { id: 20, category: "regex", prompt: "What are some common pitfalls to avoid?" },
          { id: 21, category: "regex", prompt: "How do I test this pattern?" },
          { id: 22, category: "regex", prompt: "Can you make it case-insensitive?" },
          { id: 23, category: "regex", prompt: "How do I handle special characters?" }
        ],
        javascript: [
          { id: 24, category: "javascript", prompt: "How do I handle API errors?" },
          { id: 25, category: "javascript", prompt: "Can you add request headers?" },
          { id: 26, category: "javascript", prompt: "How do I implement request retries?" },
          { id: 27, category: "javascript", prompt: "What's the best way to validate the response?" }
        ]
      };

      return [
        ...commonSuggestions,
        ...(categorySpecificSuggestions[currentCategory] || [])
      ];
    };

    setSuggestions(generateSuggestions());
  }, [currentCategory]);

  if (!currentCategory || suggestions.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
        <Sparkles className="w-4 h-4" />
        <span>Follow-up questions you might ask:</span>
      </div>
      <AnimatePresence>
        <div className="grid grid-cols-2 gap-2">
          {suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start text-sm h-auto py-2 px-3"
                onClick={() => onSuggestionSelect(suggestion.prompt)}
              >
                {suggestion.prompt}
              </Button>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}