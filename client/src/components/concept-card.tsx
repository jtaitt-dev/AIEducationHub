import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface ConceptCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
}

export function ConceptCard({ title, icon, description, details }: ConceptCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 h-full">
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.4 }}
            className="preserve-3d"
          >
            <Card
              className="card-hover cursor-pointer h-full"
              onClick={() => setIsFlipped(true)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="icon-container">{icon}</div>
                  <h3 className="text-2xl font-semibold">{title}</h3>
                </div>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -180 }}
            transition={{ duration: 0.4 }}
            className="preserve-3d"
          >
            <Card
              className="card-hover cursor-pointer h-full bg-primary/5"
              onClick={() => setIsFlipped(false)}
            >
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Key Points</h3>
                <ul className="space-y-2">
                  {details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
