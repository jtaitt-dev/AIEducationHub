import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quiz } from "@/components/quiz";
import { ConceptCard } from "@/components/concept-card";
import { Brain, Cpu, Bot, ShieldCheck, ChevronDown, Lightbulb, Dna } from "lucide-react";
import { motion } from "framer-motion";
import { AIBackground } from "@/components/AIBackground";

export default function Home() {
  const sections = useRef<HTMLElement[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const index = sections.current.findIndex(section => section === entry.target);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const aiConcepts = [
    {
      title: "What is AI?",
      icon: <Brain className="h-8 w-8 text-primary" />,
      description: "Artificial Intelligence refers to computer systems that can perform tasks typically requiring human intelligence.",
      details: [
        "Neural networks mimic human brain function",
        "Machine learning enables pattern recognition",
        "Natural language processing powers communication",
        "Computer vision enables visual understanding"
      ]
    },
    {
      title: "AI Applications",
      icon: <Bot className="h-8 w-8 text-primary" />,
      description: "AI is revolutionizing various industries and aspects of daily life with innovative solutions.",
      details: [
        "Healthcare: Disease diagnosis and treatment planning",
        "Finance: Fraud detection and risk assessment",
        "Education: Personalized learning platforms",
        "Environment: Climate modeling and conservation"
      ]
    }
  ];

  const businessApplications = [
    {
      title: "Workflow Automation",
      icon: <Cpu className="h-8 w-8 text-primary" />,
      description: "AI streamlines business operations through intelligent automation and optimization.",
      details: [
        "24/7 customer service via chatbots",
        "Predictive maintenance systems",
        "Automated document processing",
        "Smart inventory management"
      ]
    },
    {
      title: "Data Analytics",
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      description: "AI enhances decision-making through advanced data analysis and insights.",
      details: [
        "Real-time market analysis",
        "Customer behavior prediction",
        "Performance optimization",
        "Risk assessment automation"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <AIBackground />
        <div className="container py-20 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          >
            Understanding AI & ChatGPT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Discover how Artificial Intelligence is transforming our world and learn to harness its potential responsibly and effectively.
          </motion.p>
          <ChevronDown className="w-8 h-8 mx-auto text-primary animate-bounce" />
        </div>

        {/* Progress Indicator */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 space-y-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index ? 'bg-primary scale-125' : 'bg-primary/20'
              }`}
            />
          ))}
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
            {aiConcepts.map((concept, index) => (
              <ConceptCard key={index} {...concept} />
            ))}
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
            {businessApplications.map((application, index) => (
              <ConceptCard key={index} {...application} />
            ))}
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