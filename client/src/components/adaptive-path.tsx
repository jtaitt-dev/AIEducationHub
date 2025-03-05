import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code, Database, Network, Bot, Shield } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  icon: React.ReactNode;
  prerequisites: string[];
  estimatedHours: number;
  completionRate: number;
}

const topics: Topic[] = [
  {
    id: "ai-basics",
    title: "AI Fundamentals",
    description: "Core concepts and principles of Artificial Intelligence",
    difficulty: "beginner",
    icon: <Brain className="w-6 h-6" />,
    prerequisites: [],
    estimatedHours: 4,
    completionRate: 0,
  },
  {
    id: "ml-intro",
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms and applications",
    difficulty: "beginner",
    icon: <Network className="w-6 h-6" />,
    prerequisites: [],
    estimatedHours: 6,
    completionRate: 0,
  },
  {
    id: "neural-networks",
    title: "Neural Networks",
    description: "Deep learning and neural network architectures",
    difficulty: "intermediate",
    icon: <Database className="w-6 h-6" />,
    prerequisites: [],
    estimatedHours: 8,
    completionRate: 0,
  },
  {
    id: "ai-ethics",
    title: "AI Ethics & Safety",
    description: "Ethical considerations and responsible AI development",
    difficulty: "intermediate",
    icon: <Shield className="w-6 h-6" />,
    prerequisites: [],
    estimatedHours: 4,
    completionRate: 0,
  },
  {
    id: "ai-applications",
    title: "Practical AI Applications",
    description: "Real-world implementation of AI systems",
    difficulty: "advanced",
    icon: <Bot className="w-6 h-6" />,
    prerequisites: [],
    estimatedHours: 10,
    completionRate: 0,
  },
  {
    id: "ai-development",
    title: "AI Development",
    description: "Building and deploying AI solutions",
    difficulty: "advanced",
    icon: <Code className="w-6 h-6" />,
    prerequisites: [],
    estimatedHours: 12,
    completionRate: 0,
  },
];

export function AdaptivePath() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const getDifficultyColor = (difficulty: Topic["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-500";
      case "intermediate":
        return "text-blue-500";
      case "advanced":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Your Learning Path</h2>
        <p className="text-muted-foreground">
          Explore these AI learning topics in any order. Each topic is designed to build your knowledge
          and skills in artificial intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="relative transition-all duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedTopic(topic)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={getDifficultyColor(topic.difficulty)}>
                    {topic.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                    <p className="text-sm text-muted-foreground capitalize">
                      {topic.difficulty} • {topic.estimatedHours}hrs
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {topic.description}
                </p>
                <Progress value={topic.completionRate} className="h-2" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedTopic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedTopic(null)}
          >
            <Card
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={getDifficultyColor(selectedTopic.difficulty)}>
                    {selectedTopic.icon}
                  </div>
                  <CardTitle>{selectedTopic.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{selectedTopic.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Recommended Study Time</h4>
                  <p className="text-sm text-muted-foreground">
                    This module typically takes {selectedTopic.estimatedHours} hours to complete.
                  </p>
                </div>
                <Button className="w-full" size="lg">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}