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
    question: "What is AI?",
    options: [
      "A type of computer hardware",
      "Software that can learn and adapt",
      "A programming language",
      "A specific brand of computer",
    ],
    correctAnswer: 1,
    explanation: {
      correct: "AI is software that can learn and adapt from data and experience. For example, when you use a smart email filter that learns to identify spam over time - that's AI in action!",
      incorrect: "Think of AI as being like a student that learns from examples. Just as a student improves by studying patterns and examples, AI software learns from data to make better decisions over time."
    },
    relatedPath: "/learning-path#ai-basics"
  },
  {
    question: "Which of the following is a real-world application of AI?",
    options: [
      "Making coffee automatically",
      "Natural language processing in virtual assistants",
      "Basic calculator functions",
      "Regular email sending",
    ],
    correctAnswer: 1,
    explanation: {
      correct: "Virtual assistants like Siri or Alexa use AI to understand and respond to human language naturally. They can learn from conversations and improve their responses over time.",
      incorrect: "While automatic coffee makers and calculators are useful tools, they follow fixed programming. AI applications like virtual assistants can understand context, learn, and adapt to different situations."
    },
    relatedPath: "/learning-path#ai-applications"
  },
  {
    question: "How does AI improve business operations?",
    options: [
      "By replacing all human workers",
      "By automating repetitive tasks and providing insights",
      "By making the office look more modern",
      "By increasing electricity consumption",
    ],
    correctAnswer: 1,
    explanation: {
      correct: "AI enhances business by handling routine tasks (like sorting emails or processing invoices) and finding patterns in data that humans might miss. This frees up people to focus on more creative and strategic work.",
      incorrect: "AI's role isn't to replace humans but to assist them. For example, AI can analyze customer data to suggest improvements, while humans make the final strategic decisions."
    },
    relatedPath: "/learning-path#ai-applications"
  },
  {
    question: "What is machine learning in AI?",
    options: [
      "Teaching robots to walk",
      "Programming computers manually",
      "Systems learning from data and experience",
      "Installing new software updates",
    ],
    correctAnswer: 2,
    explanation: {
      correct: "Machine learning is like teaching by example. Instead of writing specific rules, we show the AI many examples, and it learns patterns. For instance, showing an AI thousands of photos of cats and dogs helps it learn to distinguish between them.",
      incorrect: "Machine learning isn't about manual programming or simple updates. It's about systems that improve automatically through experience, like how a music recommendation system gets better at suggesting songs the more you use it."
    },
    relatedPath: "/learning-path#ml-intro"
  },
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

      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedOption(null);
          setShowResult(false);
        } else {
          setQuizCompleted(true);
        }
      }, 8000); 

    } catch (error) {
      toast({
        title: "Error submitting answer",
        variant: "destructive",
      });
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
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
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
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              onClick={handleSubmit} 
              className="w-full mt-6"
              size="lg"
              disabled={selectedOption === null || showResult}
            >
              Submit Answer
            </Button>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}