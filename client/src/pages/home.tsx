import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quiz } from "@/components/quiz";

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
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="AI Technology"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">What is AI?</h2>
              <p className="text-muted-foreground">
                Artificial Intelligence (AI) refers to systems that can perform tasks
                typically requiring human intelligence. These include learning,
                reasoning, problem-solving, and understanding natural language.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12"
                alt="Business Workflow"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">AI in Business</h2>
              <p className="text-muted-foreground">
                AI is transforming how businesses operate, from automating routine
                tasks to providing deep insights through data analysis and
                enhancing customer experiences.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        ref={(el) => (sections.current[1] = el)}
        className="opacity-0"
      >
        <h2 className="text-3xl font-bold mb-6">Test Your Knowledge</h2>
        <Quiz />
      </section>
    </div>
  );
}
