import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, MessageSquare, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { PromptSuggestions } from "@/components/prompt-suggestions";

// Predefined prompts and responses
const categories = [
  {
    id: "email",
    icon: "📧",
    title: "Email Templates",
    description: "Generate formal, casual, and follow-up emails",
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
    title: "Excel Formulas",
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
      }
    ]
  },
  {
    id: "python",
    icon: "🐍",
    title: "Python Scripts",
    description: "Get Python code for common tasks",
    prompts: [
      {
        prompt: "How do I read an Excel file using pandas?",
        response: {
          role: "assistant",
          content: `Here's how to read and work with Excel files using pandas:

# First, install pandas and openpyxl
pip install pandas openpyxl

# Here's the Python code
import pandas as pd

# Read the Excel file
df = pd.read_excel('your_file.xlsx', sheet_name='Sheet1')

# Basic operations you might need:
# View first few rows
print(df.head())

# Get column names
print(df.columns)

# Filter data
filtered_df = df[df['column_name'] > 100]

# Save changes back to Excel
df.to_excel('output.xlsx', index=False)

Need help with specific pandas operations?`
        }
      }
    ]
  },
  {
    id: "sql",
    icon: "🛢",
    title: "SQL Queries",
    description: "Get help with SQL queries and database operations",
    prompts: [
      {
        prompt: "How do I join two tables in SQL?",
        response: {
          role: "assistant",
          content: `Here's a guide to joining tables in SQL:

1. INNER JOIN - Only matching rows:
SELECT orders.order_id, customers.name
FROM orders
INNER JOIN customers 
ON orders.customer_id = customers.id;

2. LEFT JOIN - All rows from left table:
SELECT products.name, categories.category_name
FROM products
LEFT JOIN categories
ON products.category_id = categories.id;

3. Common JOIN scenarios:
-- Join multiple tables
SELECT orders.order_id, 
       customers.name,
       products.product_name
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id;

Need more specific JOIN examples?`
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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      { role: "user", content: prompt.prompt || prompt },
      typeof prompt === 'string'
        ? { role: "assistant", content: "Let me help you with that question..." }
        : prompt.response
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
        {/* Chat messages container with scrolling */}
        <div className="flex-1 overflow-y-auto mb-4 pr-4 -mr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex group ${
                  message.role === "assistant" ? "bg-muted/50" : "bg-background"
                } p-6 rounded-lg`}
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
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Prompt Suggestions */}
        {selectedCategory && messages.length > 1 && (
          <PromptSuggestions
            currentCategory={selectedCategory.id}
            onSuggestionSelect={handlePromptSelect}
          />
        )}

        {/* Available prompts */}
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