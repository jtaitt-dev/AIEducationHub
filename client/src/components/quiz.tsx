import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle2, XCircle, LightbulbIcon, Trophy, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const quizQuestions = [
  {
    question: "What is Artificial Intelligence (AI)?",
    options: [
      "A type of robot that can think like humans",
      "A branch of computer science that enables machines to learn and make decisions",
      "A physical device that replaces human workers",
      "A new social media platform",
    ],
    correctAnswer: 1,
    explanation: {
      correct: "AI is a field of computer science that enables machines to learn, reason, and make decisions based on data. It is used in many industries to automate tasks and improve efficiency.",
      incorrect: "Think of AI as being like a student that learns from examples. Just as a student improves by studying patterns and examples, AI software learns from data to make better decisions over time."
    },
    relatedPath: "/learning-path#ai-basics"
  },
  {
    question: "How does AI learn from data?",
    options: [
      "By reading books like humans",
      "By processing large amounts of data and identifying patterns",
      "By guessing until it gets the right answer",
      "By asking people for advice",
    ],
    correctAnswer: 1,
    explanation: {
      correct: "AI learns by analyzing large amounts of data and finding patterns. This process is called machine learning (ML), which allows AI to make predictions and improve over time.",
      incorrect: "While humans learn by reading and asking questions, AI learns through data analysis and pattern recognition. It processes information mathematically rather than through human-like comprehension."
    },
    relatedPath: "/learning-path#ml-intro"
  },
  {
    question: "Which of these is an example of AI in daily life?",
    options: [
      "A self-checkout machine at a grocery store",
      "Google Maps giving you the fastest route",
      "A coffee machine that brews coffee",
      "A flashlight turning on and off",
    ],
    correctAnswer: 1,
    explanation: {
      correct: "Google Maps uses AI to analyze traffic data, predict delays, and suggest the best routes based on real-time conditions. It continuously learns and adapts to changing traffic patterns.",
      incorrect: "While self-checkout machines and coffee makers are automated, they follow fixed programming. True AI, like Google Maps, learns and adapts to changing conditions in real-time."
    },
    relatedPath: "/learning-path#ai-applications"
  },
  {
    question: "What makes AI different from traditional computer programs?",
    options: [
      "AI can learn and improve on its own, while traditional programs follow fixed rules",
      "AI is slower than traditional programs",
      "AI only works on smartphones",
      "AI replaces all human jobs",
    ],
    correctAnswer: 0,
    explanation: {
      correct: "Traditional programs follow predefined rules, while AI analyzes data, learns from experience, and improves over time. This makes AI more adaptable and powerful in solving complex problems.",
      incorrect: "AI's key difference is its ability to learn and adapt. Unlike traditional programs that follow fixed rules, AI systems can improve their performance through experience and data analysis."
    },
    relatedPath: "/learning-path#ai-basics"
  },
  {
    question: "What is the purpose of AI-powered chatbots like ChatGPT?",
    options: [
      "To replace human conversation completely",
      "To assist users by providing information and automating responses",
      "To control all websites on the internet",
      "To watch and listen to everything users do",
    ],
    correctAnswer: 1,
    explanation: {
      correct: "AI-powered chatbots like ChatGPT help answer questions, automate customer support, and provide useful recommendations, making interactions faster and more efficient.",
      incorrect: "Chatbots are designed to assist and enhance human work, not replace it entirely. They help automate routine tasks while leaving complex decisions to humans."
    },
    relatedPath: "/learning-path#ai-applications"
  }
];

interface ResultsCardProps {
  correctAnswers: number;
  totalQuestions: number;
  onRetry: () => void;
}

function ResultsCard({ correctAnswers, totalQuestions, onRetry }: ResultsCardProps) {
  const score = (correctAnswers / totalQuestions) * 100;

  const getFeedback = () => {
    if (score >= 90) {
      return {
        title: "Outstanding Knowledge! 🌟",
        message: "You have an excellent understanding of AI concepts. Your grasp of both theoretical and practical aspects is impressive!",
        icon: <Trophy className="w-12 h-12 text-yellow-500" />,
        recommendations: [
          "Explore advanced topics like neural network architectures",
          "Study real-world AI implementation case studies",
          "Consider learning about AI ethics and governance",
          "Dive into specialized areas like computer vision or NLP"
        ],
        suggestedPaths: [
          { title: "Neural Networks", description: "Deepen your knowledge of deep learning architectures", path: "/learning-path#neural-networks" },
          { title: "AI Development", description: "Learn to build and deploy sophisticated AI systems", path: "/learning-path#ai-development" },
          { title: "Advanced AI Concepts", description: "Explore cutting-edge research and techniques", path: "/learning-path#ai-applications" },
          { title: "AI for Business", description: "Learn how AI is revolutionizing various industries", path: "/learning-path#ai-applications"}
        ]
      };
    } else if (score >= 75) {
      return {
        title: "Great Progress! 🎯",
        message: "You have a solid grasp of AI fundamentals. Your understanding of core concepts is strong, with room to explore more advanced topics.",
        icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
        recommendations: [
          "Deep dive into machine learning algorithms",
          "Practice with hands-on AI projects",
          "Study different types of neural networks",
          "Learn about data preprocessing techniques"
        ],
        suggestedPaths: [
          { title: "Machine Learning Basics", description: "Master the fundamentals of ML algorithms", path: "/learning-path#ml-intro" },
          { title: "AI Applications", description: "Apply your knowledge to real-world problems", path: "/learning-path#ai-applications" },
          { title: "Practical Machine Learning", description: "Hands-on projects and case studies", path: "/learning-path#ml-intro"},
          { title: "AI for Data Science", description: "Combine AI with data analysis techniques", path: "/learning-path#neural-networks"}
        ]
      };
    } else if (score >= 50) {
      return {
        title: "Good Foundation! 📚",
        message: "You're building a good foundation in AI concepts. Focus on strengthening your understanding of the fundamentals.",
        icon: <BookOpen className="w-12 h-12 text-blue-500" />,
        recommendations: [
          "Review basic AI and machine learning concepts",
          "Practice with simple AI applications",
          "Study common AI use cases in business",
          "Focus on understanding data structures in AI"
        ],
        suggestedPaths: [
          { title: "AI Fundamentals", description: "Strengthen your understanding of core AI concepts", path: "/learning-path#ai-basics" },
          { title: "Machine Learning Basics", description: "Build a solid foundation in ML", path: "/learning-path#ml-intro" },
          { title: "Introduction to AI", description: "A beginner-friendly course covering key concepts", path: "/learning-path#ai-basics"},
          { title: "AI and its impact on society", description: "Explore the broader implications of AI", path: "/learning-path#ai-ethics"}
        ]
      };
    } else {
      return {
        title: "Starting Your AI Journey! 🌱",
        message: "Everyone starts somewhere! Let's build your AI knowledge from the ground up.",
        icon: <LightbulbIcon className="w-12 h-12 text-purple-500" />,
        recommendations: [
          "Start with basic AI terminology and concepts",
          "Learn about what AI can and cannot do",
          "Explore simple examples of AI in daily life",
          "Focus on understanding one concept at a time"
        ],
        suggestedPaths: [
          { title: "AI Fundamentals", description: "Start with the basics of AI", path: "/learning-path#ai-basics" },
          { title: "AI Ethics & Safety", description: "Understand the responsible use of AI", path: "/learning-path#ai-ethics" },
          { title: "Beginner's Guide to AI", description: "Easy-to-understand introduction to AI for beginners", path: "/learning-path#ai-basics"},
          { title: "AI in Everyday Life", description: "Explore AI applications in your daily routine", path: "/learning-path#ai-applications"}
        ]
      };
    }
  };

  const feedback = getFeedback();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        {feedback.icon}
        <h2 className="text-2xl font-bold">{feedback.title}</h2>
        <div className="text-lg">
          Your Score: <span className="font-bold">{score.toFixed(0)}%</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-out"
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-muted-foreground mt-4">
          {correctAnswers} correct out of {totalQuestions} questions
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Overall Assessment</h3>
          <p>{feedback.message}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Personalized Learning Path</h3>
          <ul className="space-y-3">
            {feedback.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>{rec}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Recommended Learning Paths</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {feedback.suggestedPaths.map((path, index) => (
              <Link href={path.path} key={index}>
                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <h4 className="font-medium text-lg mb-2">{path.title}</h4>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={onRetry}
        className="w-full"
        size="lg"
      >
        Try Again <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </motion.div>
  );
}

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleSubmit = async () => {
    if (selectedOption === null) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/quiz", {
        question: quizQuestions[currentQuestion].question,
        answer: quizQuestions[currentQuestion].options[selectedOption],
        isCorrect: selectedOption === quizQuestions[currentQuestion].correctAnswer,
      });

      const correct = selectedOption === quizQuestions[currentQuestion].correctAnswer;
      if (correct) {
        setCorrectAnswers(prev => prev + 1);
      }
      setIsCorrect(correct);
      setShowResult(true);
      setIsSubmitting(false);

    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error submitting answer",
        description: "Please try again in a moment",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ResultsCard
            correctAnswers={correctAnswers}
            totalQuestions={quizQuestions.length}
            onRetry={handleRetry}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="space-y-2">
          <CardTitle className="text-2xl">Question {currentQuestion + 1} of {quizQuestions.length}</CardTitle>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-xl font-medium mb-6">
              {quizQuestions[currentQuestion].question}
            </div>
            <RadioGroup
              value={selectedOption?.toString()}
              onValueChange={(value) => setSelectedOption(parseInt(value))}
              className="space-y-4"
            >
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`relative flex items-center space-x-3 rounded-lg border p-4 transition-colors
                    ${showResult && index === quizQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : showResult && index === selectedOption && !isCorrect
                      ? 'bg-red-50 border-red-200'
                      : 'hover:bg-accent'
                    }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showResult || isSubmitting} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-grow text-base cursor-pointer"
                  >
                    {option}
                  </Label>
                  {showResult && index === quizQuestions[currentQuestion].correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {showResult && index === selectedOption && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              ))}
            </RadioGroup>

            {/* Explanation Card */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-6 p-4 rounded-lg ${
                    isCorrect ? 'bg-green-50' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <LightbulbIcon className={`w-5 h-5 ${
                        isCorrect ? 'text-green-500' : 'text-blue-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-medium mb-2 ${
                        isCorrect ? 'text-green-700' : 'text-blue-700'
                      }`}>
                        {isCorrect ? "Great job! Here's why:" : "Let's understand this better:"}
                      </h3>
                      <p className="text-sm">
                        {isCorrect
                          ? quizQuestions[currentQuestion].explanation.correct
                          : quizQuestions[currentQuestion].explanation.incorrect}
                      </p>
                      <div className="mt-4">
                        <Link
                          href={quizQuestions[currentQuestion].relatedPath}
                          className="text-sm text-primary hover:underline"
                        >
                          Learn more about this topic →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {showResult ? (
              <Button
                onClick={handleNextQuestion}
                className="w-full mt-6"
                size="lg"
              >
                {currentQuestion < quizQuestions.length - 1 ? (
                  <>Next Question <ArrowRight className="ml-2 w-4 h-4" /></>
                ) : (
                  "See Results"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="w-full mt-6"
                size="lg"
                disabled={selectedOption === null || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}