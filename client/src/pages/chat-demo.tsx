import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, MessageSquare, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

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
  },
  {
    id: "regex",
    icon: "🔍",
    title: "Regex Patterns",
    description: "Get regular expressions for common patterns",
    prompts: [
      {
        prompt: "How do I validate an email with regex?",
        response: {
          role: "assistant",
          content: `Here's a reliable email validation regex pattern:

Pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$

Example usage in different languages:

// JavaScript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValid = emailRegex.test('user@example.com');

# Python
import re
email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
is_valid = re.match(email_regex, 'user@example.com')

The pattern breaks down as:
• ^: Start of string
• [a-zA-Z0-9._%+-]+: Username can contain letters, numbers, and certain special characters
• @: Email separator
• [a-zA-Z0-9.-]+: Domain name
• \\.: Dot separator
• [a-zA-Z]{2,}: Top-level domain of at least 2 characters
• $: End of string

Need help with other regex patterns?`
        }
      }
    ]
  },
  {
    id: "javascript",
    icon: "🖥",
    title: "JavaScript Code",
    description: "Get JavaScript snippets for common tasks",
    prompts: [
      {
        prompt: "How do I fetch data from an API in JavaScript?",
        response: {
          role: "assistant",
          content: `Here are different ways to fetch data from an API:

// Using async/await (Modern approach)
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Using .then() chains
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// POST request with data
async function postData(data) {
  try {
    const response = await fetch('https://api.example.com/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

Need more specific API examples?`
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
              className={`flex group ${
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