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
          { id: 5, category: "email", prompt: "Can you add a follow-up section?" }
        ],
        excel: [
          { id: 6, category: "excel", prompt: "How can I make this formula more efficient?" },
          { id: 7, category: "excel", prompt: "What are some common errors to watch out for?" }
        ],
        python: [
          { id: 8, category: "python", prompt: "How can I optimize this code?" },
          { id: 9, category: "python", prompt: "What are some alternative approaches?" }
        ],
        sql: [
          { id: 10, category: "sql", prompt: "How can I improve query performance?" },
          { id: 11, category: "sql", prompt: "What indexes should I consider?" }
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
        <span>Suggested follow-up questions:</span>
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
