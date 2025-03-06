import { lazy, Suspense, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Users, Brain, Lock, Scale, Bot, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy load components that aren't needed immediately
const FAQ = lazy(() => import("@/components/faq"));
const PracticeCard = lazy(() => import("@/components/practice-card"));

// Skeleton loader for cards
const CardSkeleton = () => (
  <div className="space-y-3">
    <div className="h-8 w-48 bg-primary/10 rounded animate-pulse" />
    <div className="h-4 w-full bg-muted rounded animate-pulse" />
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-4 w-full bg-muted rounded animate-pulse" />
      ))}
    </div>
  </div>
);

export default function BestPractices() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<number>(0);

  // Performance monitoring
  useEffect(() => {
    const startTime = performance.now();

    // Reduced initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log(`Initial load time: ${performance.now() - startTime}ms`);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Optimized card loading
  useEffect(() => {
    if (!isLoading) {
      const loadBatch = () => {
        setVisibleCards(prev => {
          const newCount = Math.min(prev + 3, practices.length);
          if (newCount === practices.length) {
            console.log(`All cards loaded in ${performance.now()}ms`);
          }
          return newCount;
        });
      };

      loadBatch(); // Load first batch immediately
      const interval = setInterval(loadBatch, 200);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-10 w-64 bg-primary/10 rounded animate-pulse mx-auto mb-4" />
          <div className="h-4 w-96 bg-muted rounded animate-pulse mx-auto mb-8" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <CardSkeleton />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-12">
      <section>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Using ChatGPT at Neta Scientific</h1>
          <p className="text-lg text-muted-foreground">
            Boost productivity and streamline your workflows with AI assistance. Learn how to use ChatGPT effectively and responsibly in your daily tasks.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button size="lg" className="bg-primary">
              Try ChatGPT Now
            </Button>
            <Button size="lg" variant="outline">
              View Quick Start Guide
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.slice(0, visibleCards).map((practice, index) => (
            <Suspense 
              key={index} 
              fallback={
                <Card className="p-6">
                  <CardSkeleton />
                </Card>
              }
            >
              <PracticeCard 
                practice={practice} 
                index={index} 
              />
            </Suspense>
          ))}
        </div>
      </section>

      <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded" />}>
        <FAQ />
      </Suspense>

      <section className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
        <p className="text-muted-foreground mb-6">
          Still have questions about using ChatGPT? Contact IT or the Catalog Team for support.
        </p>
        <Button size="lg" variant="outline">
          Contact Support Team
        </Button>
      </section>
    </div>
  );
}

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

const faqs = [
  {
    question: "How do I get access to ChatGPT?",
    answer: "Contact IT or the Catalog Team to request ChatGPT access. Once approved, you'll receive login credentials and onboarding instructions."
  },
  {
    question: "Can I use ChatGPT for ERP tasks?",
    answer: "Yes, ChatGPT can help with Dynamics 365, Salespad, and Monday.com tasks. However, never share login credentials or sensitive system information with ChatGPT."
  },
  {
    question: "Is my data secure when using ChatGPT?",
    answer: "Always remove sensitive information (customer details, order numbers, pricing) before using ChatGPT. Clear your chat history after completing tasks with business data."
  },
  {
    question: "What tasks can ChatGPT help with?",
    answer: "ChatGPT can assist with data cleaning, email drafting, Excel formulas, documentation summaries, and basic process automation. Always verify AI outputs before using them."
  }
];