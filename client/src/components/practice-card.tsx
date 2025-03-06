import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PracticeCardProps {
  practice: {
    icon: React.ReactNode;
    title: string;
    description: string;
    examples: string[];
    tooltip: string;
    quickTip: string;
  };
  index: number;
}

export default function PracticeCard({ practice, index }: PracticeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="transition-all duration-300 hover:shadow-lg cursor-help border-primary/10">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">{practice.icon}</div>
                  <CardTitle className="text-xl">{practice.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{practice.description}</p>
                <div className="bg-primary/5 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium text-primary">💡 Quick Tip:</p>
                  <p className="text-sm">{practice.quickTip}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-primary">Daily Examples:</h3>
                  <ul className="text-sm space-y-2">
                    {practice.examples.map((example, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            className="max-w-[200px] text-center bg-primary/5 backdrop-blur-sm border-primary/20"
          >
            <p>{practice.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}
