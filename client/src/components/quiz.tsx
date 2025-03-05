import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle2, XCircle } from "lucide-react";

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
  },
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
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
      setIsCorrect(correct);
      setShowResult(true);

      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedOption(null);
          setShowResult(false);
        } else {
          toast({
            title: "Quiz completed! 🎉",
            description: "You've completed all the questions. Feel free to start over!",
          });
          setCurrentQuestion(0);
          setSelectedOption(null);
          setShowResult(false);
        }
      }, 1500);

    } catch (error) {
      toast({
        title: "Error submitting answer",
        variant: "destructive",
      });
    }
  };

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