import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, MessageSquare, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Predefined prompts and responses
const categories = [
  {
    id: "email",
    icon: "📧",
    title: "Write a professional email",
    description: "Generate email templates for different scenarios",
    prompts: [
      {
        prompt: "Write a formal business email following up on a meeting",
        response: {
          role: "assistant",
          content: `Here's a formal business email template:

Subject: Meeting Follow-up - Project Timeline Discussion

Dear [Name],

I hope this email finds you well. I am writing to follow up on our meeting regarding the project timeline.

Key points discussed:
• Project milestones and deadlines
• Resource allocation
• Next steps

Please let me know if you need any clarification or have additional points to discuss.

Best regards,
[Your Name]`
        }
      },
      {
        prompt: "Write a casual team update email",
        response: {
          role: "assistant",
          content: `Here's a casual team update email:

Hey team! 👋

Quick update on our progress:
✅ Frontend designs completed
🏃‍♂️ Backend integration in progress
📅 On track for next week's deadline

Let me know if you need any help or have questions!

Cheers,
[Name]`
        }
      }
    ]
  },
  {
    id: "excel",
    icon: "📊",
    title: "Help with Excel formulas",
    description: "Get help with Excel functions and formulas",
    prompts: [
      {
        prompt: "How do I use VLOOKUP in Excel?",
        response: {
          role: "assistant",
          content: `Let me explain VLOOKUP with an example:

The VLOOKUP formula syntax is:
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])

Here's a practical example:
=VLOOKUP(A2, Sheet2!A2:D100, 2, FALSE)

Breaking it down:
• lookup_value (A2): The value you're searching for
• table_array (Sheet2!A2:D100): Where to look for the value
• col_index_num (2): Which column has the value you want to return
• range_lookup (FALSE): FALSE for exact match, TRUE for approximate

Would you like me to provide more examples or explain other Excel functions?`
        }
      },
      {
        prompt: "How do I create a Pivot Table?",
        response: {
          role: "assistant",
          content: `I'll guide you through creating a Pivot Table:

1. Start by selecting your data range
2. Go to Insert > PivotTable
3. Choose where to place the pivot table

Then, use the PivotTable Fields pane to:
• Drag fields to Rows for categories
• Add values to summarize in Values area
• Use Filters to filter your data
• Add fields to Columns for additional dimensions

Common calculations you might need:
=GETPIVOTDATA("Sales",A3)
=SUBTOTAL(9,A1:A100) // For summarizing filtered data

Need help with specific pivot table calculations?`
        }
      }
    ]
  }
];

export default function ChatDemo() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! Choose a topic below, and I'll help you with predefined responses for common scenarios."
    }
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { toast } = useToast();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard."
    });
  };

  const handlePromptSelect = (prompt) => {
    setMessages(prev => [
      ...prev,
      { role: "user", content: prompt.prompt },
      prompt.response
    ]);
  };

  return (
    <div className="container py-8 flex min-h-[calc(100vh-4rem)]">
      {/* Left sidebar with categories */}
      <div className="w-64 mr-8 flex-shrink-0">
        <h2 className="text-lg font-semibold mb-4">Examples</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedCategory?.id === category.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-medium text-sm">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "assistant" ? "bg-muted/50" : "bg-background"
              } p-4 rounded-lg`}
            >
              <div className="w-8 mr-4 flex-shrink-0">
                {message.role === "assistant" ? (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-secondary" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {message.content}
                </pre>
              </div>
              {message.role === "assistant" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleCopy(message.content)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Prompts area */}
        {selectedCategory && (
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Available prompts:</h3>
            <div className="grid gap-2">
              {selectedCategory.prompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start"
                  onClick={() => handlePromptSelect(prompt)}
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  {prompt.prompt}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}