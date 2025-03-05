import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quiz } from "@/components/quiz";
import { Button } from "@/components/ui/button";
import { Brain, Cpu, Bot, ShieldCheck } from "lucide-react";

export default function Home() {
  const sections = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "duration-700");
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container py-8 space-y-12">
      <section
        ref={(el) => (sections.current[0] = el)}
        className="opacity-0"
      >
        <h1 className="text-4xl font-bold mb-6">Understanding AI & ChatGPT</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
          Discover how Artificial Intelligence is transforming our world and learn to harness its potential responsibly and effectively.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <Brain className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">What is AI?</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Artificial Intelligence (AI) refers to computer systems that can perform tasks
                typically requiring human intelligence. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Learning from experience and adapting</li>
                <li>Understanding and processing language</li>
                <li>Recognizing patterns and making decisions</li>
                <li>Solving complex problems</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <Bot className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">AI Applications</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                AI is revolutionizing various industries and aspects of daily life:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Healthcare diagnosis and treatment planning</li>
                <li>Financial fraud detection and risk assessment</li>
                <li>Educational personalized learning systems</li>
                <li>Environmental conservation and climate modeling</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        ref={(el) => (sections.current[1] = el)}
        className="opacity-0"
      >
        <h2 className="text-3xl font-bold mb-6">AI in Business</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <Cpu className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">Workflow Automation</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                AI streamlines business operations through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Automated customer service with chatbots</li>
                <li>Predictive maintenance in manufacturing</li>
                <li>Intelligent document processing</li>
                <li>Sales forecasting and inventory management</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">Data Analytics</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                AI enhances decision-making through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Real-time market trend analysis</li>
                <li>Customer behavior prediction</li>
                <li>Performance optimization</li>
                <li>Risk assessment and management</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        ref={(el) => (sections.current[2] = el)}
        className="opacity-0"
      >
        <h2 className="text-3xl font-bold mb-6">Test Your Knowledge</h2>
        <Quiz />
      </section>
    </div>
  );
}