import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, FileText, Lightbulb, WrenchIcon, Copy, Check, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const demoScenarios = [
  {
    id: "email",
    icon: <Mail className="w-6 h-6" />,
    title: "Draft Professional Email",
    prompt: "Draft a follow-up email about a delayed shipment",
    example: "Please write a professional email to follow up on order #12345 that was supposed to arrive last week. The supplier is ABC Manufacturing, and we need the items urgently for a customer order.",
    enhancedExample: "Rewrite the follow-up email in three different tones—polite, assertive, and urgent. Display the results in a clear table format for easy comparison.",
    enhancement: "Ask ChatGPT to present multiple writing styles and organize responses clearly for easier comparison."
  },
  {
    id: "summary",
    icon: <FileText className="w-6 h-6" />,
    title: "Summarize Documents",
    prompt: "Create a summary of a product specification document",
    example: "Please summarize the key specifications, safety requirements, and technical details from this 20-page product manual into a concise 1-page overview for our sales team.",
    enhancedExample: "Summarize the manual clearly in structured bullet points under headings: Key Specifications, Safety Requirements, and Technical Details. Additionally, list five likely customer questions and brief answers based on this information.",
    enhancement: "Request structured sections, bullet points, and include potential customer questions"
  },
  {
    id: "ideas",
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Idea Generation",
    prompt: "Generate ideas for improving inventory management",
    example: "Help me brainstorm innovative ways to improve our inventory tracking system. Focus on automation opportunities and ways to reduce manual data entry errors.",
    enhancedExample: "Provide 6 innovative ideas for automating inventory tracking and reducing manual errors. Present these ideas in a table ranked by ease of implementation (easy, medium, difficult) and potential business impact (low, medium, high).",
    enhancement: "Ask for prioritized ideas based on implementation effort and business impact"
  },
  {
    id: "problem",
    icon: <WrenchIcon className="w-6 h-6" />,
    title: "Solve Problems",
    prompt: "Troubleshoot a data validation issue",
    example: "I need help creating an Excel formula that will validate supplier prices against our approved price list and highlight any discrepancies greater than 5%.",
    enhancedExample: "Provide an Excel formula that validates supplier prices against our approved list and flags discrepancies greater than 5%. Include a clear step-by-step guide for implementing this solution. Additionally, recommend conditional formatting rules to automatically highlight errors visually.",
    enhancement: "Request step-by-step explanation and additional formatting suggestions"
  }
];

export default function DemoSection() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(text);
      toast({
        title: "Copied to clipboard",
        description: "You can now paste this prompt into ChatGPT",
      });
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try selecting and copying the text manually",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="demo" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Interactive Demo</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {demoScenarios.map((scenario) => (
          <Dialog key={scenario.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {scenario.icon}
                    <CardTitle>{scenario.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{scenario.prompt}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{scenario.title}</DialogTitle>
                <DialogDescription>Try these example prompts</DialogDescription>
              </DialogHeader>

              {/* Basic Example */}
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg relative group">
                  <h3 className="font-medium mb-2">Basic Prompt:</h3>
                  <p className="font-mono text-sm">{scenario.example}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(scenario.example);
                    }}
                  >
                    {copiedPrompt === scenario.example ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Enhancement Tip */}
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <h3 className="font-medium">Next-Level Enhancement:</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{scenario.enhancement}</p>

                  {/* Enhanced Example */}
                  <div className="bg-background p-4 rounded-lg relative group">
                    <p className="font-mono text-sm">{scenario.enhancedExample}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(scenario.enhancedExample);
                      }}
                    >
                      {copiedPrompt === scenario.enhancedExample ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Button 
                  className="flex-1"
                  onClick={() => copyToClipboard(scenario.example)}
                >
                  Copy Basic Prompt
                </Button>
                <Button 
                  className="flex-1"
                  variant="secondary"
                  onClick={() => copyToClipboard(scenario.enhancedExample)}
                >
                  Copy Enhanced Prompt
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}