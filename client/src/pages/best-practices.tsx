import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, Users, Brain, Lock, Scale, Bot, LineChart } from "lucide-react";

export default function BestPractices() {
  const practices = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Data Privacy & Security",
      description: "Protect sensitive information and maintain user privacy when working with AI systems.",
      examples: [
        "Implement data anonymization before training AI models",
        "Use encryption for data transmission and storage",
        "Regular security audits of AI systems",
        "Clear data retention and deletion policies"
      ]
    },
    {
      icon: <Scale className="w-8 h-8 text-primary" />,
      title: "Fairness & Bias Prevention",
      description: "Ensure AI systems treat all users fairly and minimize algorithmic bias.",
      examples: [
        "Regular bias testing across different demographic groups",
        "Diverse training data representation",
        "Transparent decision-making processes",
        "Regular fairness metrics monitoring"
      ]
    },
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Model Transparency",
      description: "Make AI decision-making processes as transparent and explainable as possible.",
      examples: [
        "Implement explainable AI techniques",
        "Provide clear model confidence scores",
        "Document model limitations and assumptions",
        "Regular model behavior audits"
      ]
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-primary" />,
      title: "Quality Assurance",
      description: "Maintain high standards in AI development and deployment.",
      examples: [
        "Comprehensive testing across different scenarios",
        "Regular model performance evaluations",
        "Automated monitoring systems",
        "Clear incident response procedures"
      ]
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Ethical Considerations",
      description: "Consider the broader impact of AI systems on society and individuals.",
      examples: [
        "Regular ethical impact assessments",
        "Inclusive design principles",
        "Stakeholder consultation processes",
        "Environmental impact consideration"
      ]
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: "Data Governance",
      description: "Implement strong data management practices throughout the AI lifecycle.",
      examples: [
        "Clear data collection consent processes",
        "Robust data quality checks",
        "Proper data versioning",
        "Regular data audits"
      ]
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "Human Oversight",
      description: "Maintain appropriate human supervision and control over AI systems.",
      examples: [
        "Clear human-in-the-loop processes",
        "Regular system reviews by domain experts",
        "Emergency override capabilities",
        "Clear accountability frameworks"
      ]
    },
    {
      icon: <LineChart className="w-8 h-8 text-primary" />,
      title: "Performance Monitoring",
      description: "Continuously monitor and improve AI system performance.",
      examples: [
        "Real-time performance dashboards",
        "Regular model retraining schedules",
        "Automated alert systems",
        "Performance degradation detection"
      ]
    }
  ];

  return (
    <div className="container py-8 space-y-8">
      <section>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Best Practices & Ethics in AI</h1>
          <p className="text-lg text-muted-foreground">
            Essential guidelines and ethical considerations for developing and deploying AI systems responsibly.
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
                  <h3 className="font-medium text-sm text-primary">Practical Examples:</h3>
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