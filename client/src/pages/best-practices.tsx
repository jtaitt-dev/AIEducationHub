import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, Users, Brain, Lock, Scale, Bot, LineChart } from "lucide-react";

export default function BestPractices() {
  const practices = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Data Privacy & Security",
      description: "Keep user information safe and private when using AI systems.",
      examples: [
        "Remove personal details like names and addresses before training AI",
        "Use secure password protection for all AI systems",
        "Regularly check system security like you'd update your phone",
        "Have clear rules about when to delete old user data"
      ]
    },
    {
      icon: <Scale className="w-8 h-8 text-primary" />,
      title: "Fairness & Avoiding Bias",
      description: "Make sure AI treats everyone fairly and doesn't favor certain groups.",
      examples: [
        "Test AI with diverse groups of users to ensure it works well for everyone",
        "Include varied examples in training data - like different ages and backgrounds",
        "Explain clearly how AI makes decisions",
        "Keep checking if the AI is treating all users equally"
      ]
    },
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Understanding AI Decisions",
      description: "Make it clear how and why AI makes its choices.",
      examples: [
        "Show users why AI recommended a particular movie or product",
        "Tell users how confident the AI is about its decisions",
        "Be clear about what the AI can and cannot do",
        "Regularly check if AI decisions make sense"
      ]
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-primary" />,
      title: "Quality Checks",
      description: "Make sure AI systems work well and reliably.",
      examples: [
        "Test AI with different types of input to ensure it works correctly",
        "Regularly check if the AI is performing as expected",
        "Set up automatic alerts for when things go wrong",
        "Have a clear plan for fixing problems quickly"
      ]
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Ethical AI Use",
      description: "Consider how AI affects people and society.",
      examples: [
        "Think about how AI decisions impact different communities",
        "Design AI systems that are inclusive and accessible to everyone",
        "Ask users for feedback about how AI affects them",
        "Consider environmental impact when designing AI systems"
      ]
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: "Data Management",
      description: "Handle data responsibly throughout its use in AI.",
      examples: [
        "Always ask for permission before collecting user data",
        "Make sure data is accurate and up-to-date",
        "Keep track of different versions of data used",
        "Regularly review how data is being used"
      ]
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "Human Oversight",
      description: "Keep humans in control of AI systems.",
      examples: [
        "Have people review important AI decisions",
        "Get expert feedback on how the AI is working",
        "Make sure humans can override AI decisions when needed",
        "Clearly define who's responsible for AI actions"
      ]
    },
    {
      icon: <LineChart className="w-8 h-8 text-primary" />,
      title: "System Monitoring",
      description: "Keep track of how well AI systems are working.",
      examples: [
        "Use simple dashboards to show AI performance",
        "Update AI systems regularly with new data",
        "Set up alerts for unexpected behavior",
        "Watch for signs that performance is getting worse"
      ]
    }
  ];

  return (
    <div className="container py-8 space-y-8">
      <section>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Best Practices & Ethics in AI</h1>
          <p className="text-lg text-muted-foreground">
            Simple guidelines to help you use AI responsibly and effectively.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.map((practice, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4">{practice.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{practice.title}</h2>
                <p className="text-muted-foreground mb-4">{practice.description}</p>
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-primary">Examples in Practice:</h3>
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
          ))}
        </div>
      </section>
    </div>
  );
}