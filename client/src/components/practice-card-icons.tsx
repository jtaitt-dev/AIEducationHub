import { Shield, AlertTriangle, Users, Brain, Lock, Scale, Bot, LineChart } from "lucide-react";

export default function PracticeCardIcon({ iconKey }: { iconKey: string }) {
  const icons = {
    privacy: <Shield className="w-8 h-8 text-primary" />,
    fairness: <Scale className="w-8 h-8 text-primary" />,
    smart: <Brain className="w-8 h-8 text-primary" />,
    quality: <AlertTriangle className="w-8 h-8 text-primary" />,
    team: <Users className="w-8 h-8 text-primary" />,
    integration: <Lock className="w-8 h-8 text-primary" />,
    oversight: <Bot className="w-8 h-8 text-primary" />,
    performance: <LineChart className="w-8 h-8 text-primary" />
  };

  return icons[iconKey as keyof typeof icons] || null;
}