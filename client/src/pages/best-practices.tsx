import { DiscussionBoard } from "@/components/discussion-board";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, Users } from "lucide-react";

export default function BestPractices() {
  const practices = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Data Privacy",
      description: "Never share sensitive personal or business information with AI systems. Always review and sanitize data before input.",
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-primary" />,
      title: "Verify Output",
      description: "Always verify AI-generated content for accuracy and appropriateness before using it in production.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Ethical Use",
      description: "Consider the impact of AI usage on all stakeholders and ensure fair and unbiased implementation.",
    },
  ];

  return (
    <div className="container py-8 space-y-12">
      <section>
        <h1 className="text-4xl font-bold mb-6">Best Practices & Ethics</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {practices.map((practice, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="mb-4">{practice.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{practice.title}</h2>
                <p className="text-muted-foreground">{practice.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Join the Discussion</h2>
        <DiscussionBoard />
      </section>
    </div>
  );
}
