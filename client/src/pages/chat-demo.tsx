import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Predefined categories with their responses
const categories = [
  {
    id: "email",
    icon: "📧",
    title: "Email Responses",
    description: "Generate professional email templates",
    options: [
      {
        title: "Formal Business Email",
        response: `Subject: Meeting Follow-up - Project Timeline Discussion

Dear [Name],

I hope this email finds you well. I am writing to follow up on our meeting regarding the project timeline.

Key points discussed:
• Project milestones and deadlines
• Resource allocation
• Next steps

Please let me know if you need any clarification or have additional points to discuss.

Best regards,
[Your Name]`
      },
      {
        title: "Casual Team Update",
        response: `Hey team! 👋

Quick update on our progress:
✅ Frontend designs completed
🏃‍♂️ Backend integration in progress
📅 On track for next week's deadline

Let me know if you need any help or have questions!

Cheers,
[Name]`
      },
      {
        title: "Meeting Request",
        response: `Subject: Request for Meeting - [Topic]

Hi [Name],

I'd like to schedule a meeting to discuss [topic]. Would you be available for a 30-minute call this week?

Proposed times:
• Tuesday at 2 PM
• Wednesday at 11 AM
• Thursday at 4 PM

Please let me know which time works best for you.

Thanks,
[Your Name]`
      }
    ]
  },
  {
    id: "excel",
    icon: "📊",
    title: "Excel Formulas",
    description: "Common Excel formulas and functions",
    options: [
      {
        title: "VLOOKUP Formula",
        response: `=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])

Example:
=VLOOKUP(A2, Sheet2!A2:D100, 2, FALSE)

Parameters:
• lookup_value: The value to search for
• table_array: The range where to search
• col_index_num: The column number to return
• range_lookup: TRUE for approximate match, FALSE for exact match`
      },
      {
        title: "Pivot Table Formula",
        response: `To create a basic pivot table:
1. Select your data range
2. Insert > PivotTable
3. Drag fields to areas:
   • Rows: Categories/Dimensions
   • Values: Metrics to calculate
   • Filters: Optional filters
   • Columns: Additional dimensions

Useful calculations:
=GETPIVOTDATA("Sales",A3)
=SUBTOTAL(9,A1:A100) // For summarizing filtered data`
      }
    ]
  },
  {
    id: "vba",
    icon: "📝",
    title: "VBA Code",
    description: "Excel automation macros",
    options: [
      {
        title: "Auto Filter Macro",
        response: `Sub AutoFilterData()
    'Turn on AutoFilter for active sheet
    If Not ActiveSheet.AutoFilterMode Then
        ActiveSheet.Range("A1").AutoFilter
    End If

    'Filter Column A for specific value
    ActiveSheet.Range("A:A").AutoFilter Field:=1, Criteria1:="YourValue"
End Sub`
      },
      {
        title: "Format Worksheet",
        response: `Sub FormatWorksheet()
    With ActiveSheet
        'Clear existing formatting
        .Cells.ClearFormats

        'Format headers
        With .Range("A1:Z1")
            .Font.Bold = True
            .Interior.Color = RGB(200, 200, 200)
        End With

        'Autofit columns
        .Cells.EntireColumn.AutoFit
    End With
End Sub`
      }
    ]
  }
];

export default function ChatDemo() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard."
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Interactive ChatGPT Demo</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Select a category below to see AI-generated responses for common tasks and questions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedCategory?.id === category.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedOption(null);
            }}
          >
            <CardContent className="p-6">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {selectedCategory.title} Templates
                </h3>
                <div className="grid gap-4">
                  {selectedCategory.options.map((option) => (
                    <div key={option.title}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setSelectedOption(option)}
                      >
                        <ChevronRight className="mr-2 h-4 w-4" />
                        {option.title}
                      </Button>

                      <AnimatePresence>
                        {selectedOption?.title === option.title && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                          >
                            <Card>
                              <CardContent className="p-4 relative">
                                <pre className="whitespace-pre-wrap font-mono text-sm">
                                  {option.response}
                                </pre>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="absolute top-2 right-2"
                                  onClick={() => handleCopy(option.response)}
                                >
                                  {copied ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}