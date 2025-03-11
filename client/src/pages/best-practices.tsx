import { lazy, Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Performance monitoring
console.time('BestPractices_Load');

// Lazy load components with performance tracking
const FAQ = lazy(() => {
  console.time('FAQ_Load');
  return import("@/components/faq").then(mod => {
    console.timeEnd('FAQ_Load');
    return mod;
  });
});

const DemoSection = lazy(() => {
  console.time('DemoSection_Load');
  return import("@/components/demo-section").then(mod => {
    console.timeEnd('DemoSection_Load');
    return mod;
  });
});

const ScenariosSection = lazy(() => {
  console.time('ScenariosSection_Load');
  return import("@/components/scenarios-section").then(mod => {
    console.timeEnd('ScenariosSection_Load');
    return mod;
  });
});

const PracticeCard = lazy(() => {
  console.time('PracticeCard_Load');
  return import("@/components/practice-card").then(mod => {
    console.timeEnd('PracticeCard_Load');
    return mod;
  });
});

// Navigation items
const navItems = [
  { id: "intro", label: "Intro" },
  { id: "scenarios", label: "Real-world Scenarios" },
  { id: "demo", label: "Hands-On Demo" },
  { id: "best-practices", label: "Best Practices" },
  { id: "qa", label: "Q&A" }
];

export default function BestPractices() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("intro");

  // Load monitoring
  useEffect(() => {
    const loadContent = () => {
      setIsLoading(false);
      console.timeEnd('BestPractices_Load');
    };
    const timer = setTimeout(loadContent, 300);
    return () => clearTimeout(timer);
  }, []);

  // Navigation handling with keyboard support
  useEffect(() => {
    const handleKeyNavigation = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const currentIndex = navItems.findIndex(item => item.id === activeSection);
        const newIndex = e.key === 'ArrowRight'
          ? Math.min(currentIndex + 1, navItems.length - 1)
          : Math.max(currentIndex - 1, 0);
        scrollToSection(navItems[newIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="h-10 w-64 bg-primary/10 rounded animate-pulse mx-auto mb-4" />
        <div className="h-4 w-96 bg-muted rounded animate-pulse mx-auto" />
      </div>
    );
  }

  return (
    <>
      {/* Fixed Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex gap-6 text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors hover:text-foreground/80 ${
                  activeSection === item.id ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container py-8 space-y-16">
        {/* Intro Section */}
        <section id="intro" className="space-y-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Lunch & Learn: ChatGPT—Your New Productivity Partner
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover how to leverage ChatGPT to boost your productivity and streamline your daily tasks at Neta Scientific.
            </p>
            <Button size="lg" className="mt-6" onClick={() => window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer')}>
              Try ChatGPT Now
            </Button>
          </div>
        </section>

        {/* Real-world Scenarios Section */}
        <Suspense fallback={
          <div className="h-32 w-full bg-muted animate-pulse rounded" />
        }>
          <section id="scenarios">
            <ScenariosSection />
          </section>
        </Suspense>

        {/* Hands-on Demo Section */}
        <Suspense fallback={
          <div className="h-32 w-full bg-muted animate-pulse rounded" />
        }>
          <section id="demo">
            <DemoSection />
          </section>
        </Suspense>

        {/* Best Practices Section */}
        <section id="best-practices" className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Best Practices & Ethics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Suspense
                key={index}
                fallback={
                  <Card className="p-6">
                    <div className="space-y-3 animate-pulse">
                      <div className="h-8 w-48 bg-primary/10 rounded" />
                      <div className="h-4 w-full bg-muted rounded" />
                    </div>
                  </Card>
                }
              >
                <PracticeCard index={index} />
              </Suspense>
            ))}
          </div>
        </section>

        {/* Q&A Section */}
        <section id="qa" className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Questions & Answers</h2>
          <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded" />}>
            <FAQ />
          </Suspense>
        </section>
      </div>
    </>
  );
}