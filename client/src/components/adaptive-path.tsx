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
      link?: string;
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
        "Identify different types of AI applications",
        "Understand the role of data in AI systems"
      ],
      keyTopics: [
        "Definition and Types of AI",
        "Machine Learning vs. Traditional Programming",
        "Supervised vs. Unsupervised Learning",
        "AI Problem-Solving Approaches",
        "Introduction to Neural Networks"
      ],
      realWorldApplications: [
        "Virtual Personal Assistants (Siri, Alexa)",
        "Email Spam Filters and Smart Categorization",
        "Netflix and Spotify Recommendations",
        "Smart Home Device Automation",
        "Facial Recognition Systems"
      ],
      exercises: [
        {
          title: "AI Application Identification",
          description: "Analyze and categorize AI applications in your daily life, identifying the type of AI used in each case"
        },
        {
          title: "Problem-Solution Mapping",
          description: "Create a mapping between real-world problems and potential AI solutions, considering ethical implications"
        },
        {
          title: "AI vs Traditional Programming",
          description: "Compare how traditional programming and AI approaches would solve the same problem"
        }
      ],
      resources: [
        {
          title: "AI for Everyone by Andrew Ng",
          type: "video",
          description: "Comprehensive Coursera course covering AI basics",
          link: "https://www.coursera.org/learn/ai-for-everyone"
        },
        {
          title: "Elements of AI",
          type: "tutorial",
          description: "Free online course covering AI fundamentals",
          link: "https://www.elementsofai.com/"
        },
        {
          title: "Understanding AI: A Beginner's Guide",
          type: "article",
          description: "MIT Technology Review's introduction to AI concepts",
          link: "https://www.technologyreview.com/artificial-intelligence/"
        },
        {
          title: "Practical AI Applications",
          type: "video",
          description: "Google AI's overview of real-world AI applications",
          link: "https://ai.google/education/"
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
        "Master fundamental ML concepts and terminology",
        "Understand different types of learning algorithms",
        "Learn data preparation and preprocessing techniques",
        "Grasp model evaluation and validation methods",
        "Implement basic ML models using Python"
      ],
      keyTopics: [
        "Supervised vs Unsupervised Learning",
        "Classification and Regression",
        "Model Training and Validation",
        "Feature Engineering",
        "Basic Neural Networks"
      ],
      realWorldApplications: [
        "Customer Churn Prediction Systems",
        "Credit Card Fraud Detection",
        "Medical Diagnosis Assistance",
        "Stock Market Prediction",
        "Natural Language Processing"
      ],
      exercises: [
        {
          title: "Iris Classification",
          description: "Build a simple classifier using the famous Iris dataset to understand basic ML concepts"
        },
        {
          title: "House Price Prediction",
          description: "Develop a regression model to predict house prices based on various features"
        },
        {
          title: "Customer Segmentation",
          description: "Use clustering algorithms to segment customers based on their behavior"
        }
      ],
      resources: [
        {
          title: "Machine Learning Crash Course",
          type: "tutorial",
          description: "Google's comprehensive ML course with TensorFlow",
          link: "https://developers.google.com/machine-learning/crash-course"
        },
        {
          title: "Introduction to Statistical Learning",
          type: "article",
          description: "Free textbook covering ML fundamentals",
          link: "https://www.statlearning.com/"
        },
        {
          title: "Practical Machine Learning Tutorial",
          type: "video",
          description: "Stanford's CS229 Machine Learning Course",
          link: "https://www.youtube.com/watch?v=jGwO_UgTS7I"
        },
        {
          title: "Scikit-learn Tutorials",
          type: "tutorial",
          description: "Official scikit-learn tutorials for practical ML",
          link: "https://scikit-learn.org/stable/tutorial/index.html"
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
      overview: "Dive deep into neural networks and deep learning. Learn about different architectures, training techniques, and applications in solving complex problems.",
      objectives: [
        "Understand neural network architecture and mathematics",
        "Master different types of neural networks",
        "Learn backpropagation and optimization",
        "Implement deep learning models",
        "Understand GPU acceleration and distributed training"
      ],
      keyTopics: [
        "Deep Neural Networks",
        "Convolutional Neural Networks (CNN)",
        "Recurrent Neural Networks (RNN)",
        "Transformers and Attention Mechanisms",
        "Transfer Learning"
      ],
      realWorldApplications: [
        "Image Recognition Systems",
        "Natural Language Processing",
        "Speech Recognition",
        "Autonomous Vehicles",
        "Game Playing AI"
      ],
      exercises: [
        {
          title: "MNIST Digit Recognition",
          description: "Build a CNN to recognize handwritten digits using the MNIST dataset"
        },
        {
          title: "Sentiment Analysis with RNNs",
          description: "Create a sentiment analyzer using recurrent neural networks"
        },
        {
          title: "Image Style Transfer",
          description: "Implement neural style transfer using pretrained CNNs"
        }
      ],
      resources: [
        {
          title: "Deep Learning Specialization",
          type: "video",
          description: "Andrew Ng's comprehensive deep learning course",
          link: "https://www.coursera.org/specializations/deep-learning"
        },
        {
          title: "Fast.ai Practical Deep Learning",
          type: "tutorial",
          description: "Practical deep learning for coders",
          link: "https://course.fast.ai/"
        },
        {
          title: "Neural Networks and Deep Learning",
          type: "article",
          description: "Online book by Michael Nielsen",
          link: "http://neuralnetworksanddeeplearning.com/"
        },
        {
          title: "PyTorch Tutorials",
          type: "tutorial",
          description: "Official PyTorch tutorials and examples",
          link: "https://pytorch.org/tutorials/"
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
        "Learn about bias detection and mitigation",
        "Master responsible AI development practices",
        "Implement fairness metrics and monitoring",
        "Understand privacy and security implications"
      ],
      keyTopics: [
        "AI Bias and Fairness",
        "Privacy and Data Protection",
        "Transparency and Explainability",
        "Ethical Guidelines and Frameworks",
        "Responsible AI Development"
      ],
      realWorldApplications: [
        "Fair Lending Systems",
        "Ethical Recruitment AI",
        "Responsible Content Moderation",
        "Privacy-Preserving AI Systems",
        "Explainable Medical AI"
      ],
      exercises: [
        {
          title: "Bias Detection Workshop",
          description: "Analyze real datasets for potential biases and develop mitigation strategies"
        },
        {
          title: "Ethical Framework Development",
          description: "Create comprehensive guidelines for responsible AI development"
        },
        {
          title: "Privacy Impact Assessment",
          description: "Conduct a privacy impact assessment for an AI system"
        }
      ],
      resources: [
        {
          title: "AI Ethics: Global Perspectives",
          type: "video",
          description: "MIT's course on AI ethics and society",
          link: "https://www.media.mit.edu/courses/ai-ethics/"
        },
        {
          title: "Responsible AI Practices",
          type: "article",
          description: "Google's AI ethics guidelines and practices",
          link: "https://ai.google/responsibility/"
        },
        {
          title: "Ethics of Artificial Intelligence",
          type: "tutorial",
          description: "Stanford's course on AI ethics",
          link: "https://cs181.stanford.edu/"
        },
        {
          title: "Fairness in Machine Learning",
          type: "article",
          description: "Research paper on fairness metrics",
          link: "https://arxiv.org/abs/1908.09635"
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
        "Design and implement end-to-end AI solutions",
        "Master system integration techniques",
        "Learn deployment and scaling strategies",
        "Implement monitoring and maintenance",
        "Optimize AI system performance"
      ],
      keyTopics: [
        "System Architecture Design",
        "API Development and Integration",
        "Cloud Deployment Strategies",
        "Performance Optimization",
        "Monitoring and Maintenance"
      ],
      realWorldApplications: [
        "E-commerce Recommendation Systems",
        "Customer Service Chatbots",
        "Predictive Maintenance Systems",
        "Automated Content Generation",
        "Real-time Analytics Platforms"
      ],
      exercises: [
        {
          title: "Recommendation System",
          description: "Build a complete product recommendation system using collaborative filtering"
        },
        {
          title: "Chatbot Development",
          description: "Create and deploy a customer service chatbot with natural language processing"
        },
        {
          title: "Predictive Analytics",
          description: "Develop a predictive maintenance system for industrial equipment"
        }
      ],
      resources: [
        {
          title: "Full Stack Deep Learning",
          type: "tutorial",
          description: "Course on deploying deep learning systems",
          link: "https://fullstackdeeplearning.com/"
        },
        {
          title: "Applied ML at Facebook",
          type: "article",
          description: "Case study of ML applications at scale",
          link: "https://engineering.fb.com/ml-applications/"
        },
        {
          title: "Building ML Powered Applications",
          type: "video",
          description: "O'Reilly course on practical ML applications",
          link: "https://learning.oreilly.com/library/view/building-machine-learning/9781492045106/"
        },
        {
          title: "MLOps Best Practices",
          type: "tutorial",
          description: "Google Cloud's guide to ML operations",
          link: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning"
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
        "Master modern AI development workflows",
        "Implement CI/CD for ML projects",
        "Learn version control for AI models",
        "Understand distributed training",
        "Master debugging and optimization"
      ],
      keyTopics: [
        "Development Environment Setup",
        "Version Control and MLflow",
        "Testing AI Systems",
        "Distributed Training",
        "Model Optimization"
      ],
      realWorldApplications: [
        "Automated ML Pipelines",
        "Model Registry Systems",
        "A/B Testing Frameworks",
        "Feature Stores",
        "Model Monitoring Systems"
      ],
      exercises: [
        {
          title: "MLOps Pipeline",
          description: "Build a complete CI/CD pipeline for ML models using GitHub Actions"
        },
        {
          title: "Model Version Control",
          description: "Implement version control for ML models using DVC and Git"
        },
        {
          title: "Distributed Training",
          description: "Set up distributed training using PyTorch Lightning"
        }
      ],
      resources: [
        {
          title: "MLOps Specialization",
          type: "tutorial",
          description: "DeepLearning.AI's MLOps course",
          link: "https://www.coursera.org/specializations/mlops-machine-learning-operations"
        },
        {
          title: "Machine Learning Engineering",
          type: "article",
          description: "Comprehensive book on ML engineering",
          link: "http://www.mlebook.com/"
        },
        {
          title: "Distributed Training with PyTorch",
          type: "video",
          description: "PyTorch's official distributed training tutorial",
          link: "https://pytorch.org/tutorials/intermediate/ddp_tutorial.html"
        },
        {
          title: "ML Testing Guide",
          type: "article",
          description: "Google's guide to testing ML systems",
          link: "https://developers.google.com/machine-learning/testing-debugging"
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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-8 pt-16 overflow-y-auto"
            onClick={() => setSelectedTopic(null)}
          >
            <Card
              className="w-full max-w-3xl my-8"
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
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
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
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}