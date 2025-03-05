import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code, Database, Network, Bot, Shield, Check, ChevronRight } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  icon: React.ReactNode;
  prerequisites: string[];
  estimatedHours: number;
  completionRate: number;
  content: {
    overview: string;
    objectives: string[];
    keyTopics: string[];
    realWorldApplications: string[];
    exercises: {
      title: string;
      description: string;
    }[];
    resources: {
      title: string;
      type: "video" | "article" | "tutorial";
      description: string;
    }[];
  };
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
    content: {
      overview: "Start your AI journey by understanding the fundamental concepts that power modern artificial intelligence systems. This module covers the basic principles, terminology, and key ideas that form the foundation of AI.",
      objectives: [
        "Understand what AI is and its different types",
        "Learn about the history and evolution of AI",
        "Grasp basic AI terminology and concepts",
        "Identify different types of AI applications"
      ],
      keyTopics: [
        "Definition and Types of AI",
        "Machine Learning vs. Traditional Programming",
        "Supervised vs. Unsupervised Learning",
        "AI Problem-Solving Approaches"
      ],
      realWorldApplications: [
        "Virtual Personal Assistants",
        "Email Spam Filters",
        "Product Recommendations",
        "Smart Home Devices"
      ],
      exercises: [
        {
          title: "AI Application Identification",
          description: "Identify AI applications in your daily life and classify them by type"
        },
        {
          title: "Problem-Solution Mapping",
          description: "Match real-world problems with appropriate AI solutions"
        }
      ],
      resources: [
        {
          title: "Introduction to AI Concepts",
          type: "video",
          description: "A comprehensive overview of AI fundamentals"
        },
        {
          title: "AI in Everyday Life",
          type: "article",
          description: "Explore how AI is already impacting our daily activities"
        }
      ]
    }
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
    content: {
      overview: "Discover the foundations of machine learning, including key algorithms, data preprocessing, and model evaluation techniques. Learn how machines can learn from data to make predictions and decisions.",
      objectives: [
        "Understand basic ML algorithms and their applications",
        "Learn about data preparation and preprocessing",
        "Master fundamental ML terminology",
        "Implement simple ML models"
      ],
      keyTopics: [
        "Types of Machine Learning",
        "Basic Classification Algorithms",
        "Regression Analysis",
        "Model Evaluation Metrics"
      ],
      realWorldApplications: [
        "Customer Churn Prediction",
        "Credit Card Fraud Detection",
        "Image Classification",
        "Weather Forecasting"
      ],
      exercises: [
        {
          title: "Dataset Exploration",
          description: "Analyze a real-world dataset and identify patterns"
        },
        {
          title: "Simple Classification",
          description: "Build a basic classifier for a common ML problem"
        }
      ],
      resources: [
        {
          title: "ML Algorithm Deep Dive",
          type: "tutorial",
          description: "Step-by-step guide to implementing ML algorithms"
        },
        {
          title: "Data Preprocessing Guide",
          type: "article",
          description: "Learn essential data preparation techniques"
        }
      ]
    }
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
    content: {
      overview: "Explore the fascinating world of neural networks and deep learning. Learn about different network architectures, training techniques, and applications in solving complex problems.",
      objectives: [
        "Understand neural network architecture and components",
        "Learn about different types of neural networks",
        "Master backpropagation and training processes",
        "Implement basic neural networks"
      ],
      keyTopics: [
        "Artificial Neural Networks (ANN)",
        "Convolutional Neural Networks (CNN)",
        "Recurrent Neural Networks (RNN)",
        "Activation Functions and Layers"
      ],
      realWorldApplications: [
        "Computer Vision Systems",
        "Natural Language Processing",
        "Speech Recognition",
        "Autonomous Vehicles"
      ],
      exercises: [
        {
          title: "Network Architecture Design",
          description: "Design a neural network for a specific problem"
        },
        {
          title: "Image Classification with CNNs",
          description: "Build a simple image classifier using CNNs"
        }
      ],
      resources: [
        {
          title: "Neural Networks Explained",
          type: "video",
          description: "Visual guide to understanding neural networks"
        },
        {
          title: "Deep Learning in Practice",
          type: "tutorial",
          description: "Hands-on implementation of neural networks"
        }
      ]
    }
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
    content: {
      overview: "Understand the ethical implications of AI development and learn how to build responsible AI systems that benefit society while minimizing potential harm.",
      objectives: [
        "Understand key ethical considerations in AI",
        "Learn about bias in AI systems",
        "Master responsible AI development practices",
        "Implement fairness metrics"
      ],
      keyTopics: [
        "AI Bias and Fairness",
        "Privacy and Security",
        "Transparency and Explainability",
        "Ethical Guidelines and Frameworks"
      ],
      realWorldApplications: [
        "Fair Lending Systems",
        "Ethical Recruitment AI",
        "Responsible Content Moderation",
        "Privacy-Preserving AI"
      ],
      exercises: [
        {
          title: "Bias Detection",
          description: "Identify and measure bias in AI systems"
        },
        {
          title: "Ethical Framework Development",
          description: "Create guidelines for responsible AI development"
        }
      ],
      resources: [
        {
          title: "AI Ethics Principles",
          type: "article",
          description: "Comprehensive guide to ethical AI development"
        },
        {
          title: "Case Studies in AI Ethics",
          type: "video",
          description: "Real-world examples of ethical challenges"
        }
      ]
    }
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
    content: {
      overview: "Learn how to apply AI techniques to solve real-world problems. This module focuses on practical implementation and deployment of AI systems across various domains.",
      objectives: [
        "Build end-to-end AI solutions",
        "Integrate AI with existing systems",
        "Deploy AI models to production",
        "Monitor and maintain AI systems"
      ],
      keyTopics: [
        "AI System Architecture",
        "Model Deployment Strategies",
        "Performance Optimization",
        "System Integration"
      ],
      realWorldApplications: [
        "Recommendation Systems",
        "Chatbots and Virtual Assistants",
        "Predictive Maintenance",
        "Automated Decision Systems"
      ],
      exercises: [
        {
          title: "Build a Recommendation System",
          description: "Implement a complete recommendation engine"
        },
        {
          title: "Chatbot Development",
          description: "Create and deploy a functional chatbot"
        }
      ],
      resources: [
        {
          title: "AI System Design",
          type: "tutorial",
          description: "Guide to building production-ready AI systems"
        },
        {
          title: "Deployment Best Practices",
          type: "article",
          description: "Learn how to deploy AI systems effectively"
        }
      ]
    }
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
    content: {
      overview: "Master the development lifecycle of AI projects, from conception to deployment. Learn best practices, tools, and frameworks used in professional AI development.",
      objectives: [
        "Master AI development workflows",
        "Learn version control for AI",
        "Implement CI/CD for AI projects",
        "Optimize AI system performance"
      ],
      keyTopics: [
        "Development Environments",
        "Version Control for AI",
        "Testing AI Systems",
        "Performance Optimization"
      ],
      realWorldApplications: [
        "MLOps Pipelines",
        "Automated Model Training",
        "Model Versioning",
        "System Monitoring"
      ],
      exercises: [
        {
          title: "CI/CD Pipeline Setup",
          description: "Build an automated AI deployment pipeline"
        },
        {
          title: "Performance Optimization",
          description: "Optimize an AI system for production"
        }
      ],
      resources: [
        {
          title: "Professional AI Development",
          type: "tutorial",
          description: "Complete guide to AI development practices"
        },
        {
          title: "MLOps Best Practices",
          type: "video",
          description: "Learn about managing AI systems in production"
        }
      ]
    }
  }
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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedTopic(null)}
          >
            <Card
              className="w-full max-w-3xl"
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
              <CardContent className="space-y-6">
                {/* Overview Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-muted-foreground">{selectedTopic.content.overview}</p>
                </div>

                {/* Learning Objectives */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Learning Objectives</h3>
                  <ul className="grid gap-2">
                    {selectedTopic.content.objectives.map((objective, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Topics */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Topics</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedTopic.content.keyTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-lg bg-muted"
                      >
                        <ChevronRight className="w-4 h-4 text-primary" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-world Applications */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Real-world Applications</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedTopic.content.realWorldApplications.map((app, index) => (
                      <div
                        key={index}
                        className="p-2 rounded-lg bg-muted/50"
                      >
                        {app}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Exercises */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Practical Exercises</h3>
                  <div className="space-y-2">
                    {selectedTopic.content.exercises.map((exercise, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <h4 className="font-medium mb-1">{exercise.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exercise.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Learning Resources</h3>
                  <div className="space-y-2">
                    {selectedTopic.content.resources.map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 rounded-lg bg-muted"
                      >
                        <div className="capitalize text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {resource.type}
                        </div>
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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