import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quiz } from "@/components/quiz";
import { Brain, Cpu, Bot, ShieldCheck, ChevronDown } from "lucide-react";

export default function Home() {
  const sections = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] hero-gradient flex items-center justify-center overflow-hidden">
        <div className="container py-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Understanding AI & ChatGPT
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Discover how Artificial Intelligence is transforming our world and learn to harness its potential responsibly and effectively.
          </p>
          <ChevronDown className="w-8 h-8 mx-auto text-primary animate-bounce" />
        </div>
      </section>

      <div className="container py-16 space-y-24">
        {/* What is AI Section */}
        <section
          ref={(el) => {
            if (el) sections.current[0] = el;
          }}
          className="fade-in-up"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Understanding AI</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-hover stagger-1">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="icon-container">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">What is AI?</h3>
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
            <Card className="card-hover stagger-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="icon-container">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">AI Applications</h3>
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

        {/* AI in Business Section */}
        <section
          ref={(el) => {
            if (el) sections.current[1] = el;
          }}
          className="fade-in-up"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">AI in Business</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-hover stagger-1">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="icon-container">
                    <Cpu className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Workflow Automation</h3>
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
            <Card className="card-hover stagger-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="icon-container">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Data Analytics</h3>
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

        {/* Quiz Section */}
        <section
          ref={(el) => {
            if (el) sections.current[2] = el;
          }}
          className="fade-in-up"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Test Your Knowledge</h2>
          <Quiz />
        </section>
      </div>
    </div>
  );
}