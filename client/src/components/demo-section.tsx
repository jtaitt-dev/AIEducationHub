import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, FileText, Lightbulb, WrenchIcon, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const demoScenarios = [
  {
    id: "email",
    icon: <Mail className="w-6 h-6" />,
    title: "Draft Professional Email",
    prompt: "Draft a follow-up email to a supplier about delayed shipment",
    example: "Please write a professional email to follow up on order #12345 that was supposed to arrive last week. The supplier is ABC Manufacturing, and we need the items urgently for a customer order."
  },
  {
    id: "summary",
    icon: <FileText className="w-6 h-6" />,
    title: "Summarize Documents",
    prompt: "Create a summary of a product specification document",
    example: "Please summarize the key specifications, safety requirements, and technical details from this 20-page product manual into a concise 1-page overview for our sales team."
  },
  {
    id: "ideas",
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Idea Generation",
    prompt: "Generate ideas for improving inventory management",
    example: "Help me brainstorm innovative ways to improve our inventory tracking system. Focus on automation opportunities and ways to reduce manual data entry errors."
  },
  {
    id: "problem",
    icon: <WrenchIcon className="w-6 h-6" />,
    title: "Solve Problems",
    prompt: "Troubleshoot a data validation issue",
    example: "I need help creating an Excel formula that will validate supplier prices against our approved price list and highlight any discrepancies greater than 5%."
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{scenario.title}</DialogTitle>
                <DialogDescription>Try this example prompt</DialogDescription>
              </DialogHeader>
              <div className="bg-muted p-4 rounded-lg relative group">
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
              <Button 
                className="w-full"
                onClick={() => copyToClipboard(scenario.example)}
              >
                Copy & Try in ChatGPT
              </Button>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}