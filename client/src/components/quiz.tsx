import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";

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
  const { toast } = useToast();

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

      const isCorrect = selectedOption === quizQuestions[currentQuestion].correctAnswer;

      toast({
        title: isCorrect ? "Correct! 🎉" : "Incorrect",
        description: isCorrect 
          ? "Great job! Let's try another question."
          : "Don't worry, learning about AI takes time. Try again!",
        variant: isCorrect ? "default" : "destructive",
      });

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        toast({
          title: "Quiz completed!",
          description: "You've completed all the questions. Feel free to start over!",
        });
        setCurrentQuestion(0);
        setSelectedOption(null);
      }
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
        <CardTitle>Question {currentQuestion + 1} of {quizQuestions.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-lg font-medium">
            {quizQuestions[currentQuestion].question}
          </div>
          <RadioGroup
            value={selectedOption?.toString()}
            onValueChange={(value) => setSelectedOption(parseInt(value))}
            className="space-y-4"
          >
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            size="lg"
          >
            Submit Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}