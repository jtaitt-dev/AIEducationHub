import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Shield, AlertTriangle, Users, Brain, Lock, Scale, Bot, LineChart } from "lucide-react";

// Define practices data here to keep it with the component
const practices = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Data Privacy & Security",
    description: "Keep customer and supplier information safe when using AI tools.",
    examples: [
      "Remove customer names and order numbers before asking ChatGPT for help",
      "Never share supplier pricing sheets directly with AI - summarize data instead",
      "Use company password manager for AI tool access",
      "Clear your chat history after completing sensitive tasks"
    ],
    tooltip: "Protect sensitive business information",
    quickTip: "Always sanitize data before sharing with AI"
  },
  {
    icon: <Scale className="w-8 h-8 text-primary" />,
    title: "Fairness & Validation",
    description: "Ensure AI suggestions are accurate and fair for all suppliers and customers.",
    examples: [
      "Cross-check AI pricing suggestions against official supplier catalogs",
      "Test AI responses with different product categories",
      "Verify automated email responses for accuracy",
      "Double-check AI-generated supplier quotes"
    ],
    tooltip: "Maintain accuracy and fairness in AI operations",
    quickTip: "Verify AI suggestions against official sources"
  },
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: "Smart AI Usage",
    description: "Make the most of AI tools for daily tasks.",
    examples: [
      "Use ChatGPT to help clean and format supplier data files",
      "Ask AI to help draft initial supplier communication emails",
      "Get AI assistance with Excel formulas for inventory tracking",
      "Use AI to summarize long supplier documentation"
    ],
    tooltip: "Leverage AI to boost productivity",
    quickTip: "Start with simple, repetitive tasks"
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-primary" />,
    title: "Quality Control",
    description: "Double-check AI outputs before using them in business operations.",
    examples: [
      "Review AI-generated pricing before sending to customers",
      "Verify product specifications against manufacturer data",
      "Test AI-suggested inventory formulas with sample data",
      "Have a colleague review important AI-generated content"
    ],
    tooltip: "Maintain high accuracy in AI-assisted work",
    quickTip: "Always verify critical information"
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Team Collaboration",
    description: "Work together to use AI effectively.",
    examples: [
      "Share successful ChatGPT prompts for common tasks",
      "Document which AI tools work best for specific supplier tasks",
      "Create a team knowledge base of AI best practices",
      "Regular team updates on new AI features and uses"
    ],
    tooltip: "Build collective AI expertise",
    quickTip: "Share successful AI workflows"
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "ERP & CRM Integration",
    description: "Use AI safely with business systems.",
    examples: [
      "Use AI to help troubleshoot Dynamics 365 workflows",
      "Get AI assistance with Salespad report formatting",
      "Use ChatGPT to optimize Monday.com task templates",
      "Keep system credentials secure when using AI"
    ],
    tooltip: "Integrate AI with existing systems safely",
    quickTip: "Never share system credentials with AI"
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "Human Oversight",
    description: "Keep human judgment in the loop.",
    examples: [
      "Review AI-generated supplier reports before sharing",
      "Manually verify pricing calculations from AI",
      "Keep final approval on customer communications",
      "Know when to handle sensitive supplier negotiations directly"
    ],
    tooltip: "Maintain control over AI processes",
    quickTip: "Always review AI suggestions"
  },
  {
    icon: <LineChart className="w-8 h-8 text-primary" />,
    title: "Performance Tracking",
    description: "Monitor how AI improves your work.",
    examples: [
      "Track time saved using AI for data entry",
      "Document successful AI-assisted supplier negotiations",
      "Report any AI mistakes or inaccuracies",
      "Share AI productivity wins with the team"
    ],
    tooltip: "Measure AI effectiveness",
    quickTip: "Keep track of AI successes"
  }
];

interface PracticeCardProps {
  index: number;
}

export default function PracticeCard({ index }: PracticeCardProps) {
  const practice = practices[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="transition-all duration-300 hover:shadow-lg cursor-help border-primary/10">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">{practice.icon}</div>
                  <CardTitle className="text-xl">{practice.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{practice.description}</p>
                <div className="bg-primary/5 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium text-primary">💡 Quick Tip:</p>
                  <p className="text-sm">{practice.quickTip}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-primary">Daily Examples:</h3>
                  <ul className="text-sm space-y-2">
                    {practice.examples.map((example, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            className="max-w-[200px] text-center bg-primary/5 backdrop-blur-sm border-primary/20"
          >
            <p>{practice.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}