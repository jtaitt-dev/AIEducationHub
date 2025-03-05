import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ParticleSettings {
  count: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

interface ParticleControlsProps {
  onSettingsChange: (settings: ParticleSettings) => void;
}

export function ParticleControls({ onSettingsChange }: ParticleControlsProps) {
  const [settings, setSettings] = useState<ParticleSettings>({
    count: 2000,
    size: 0.03,
    speed: 1,
    color: "#0066cc",
    opacity: 0.8,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof ParticleSettings, value: number | string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="fixed bottom-4 right-0 flex items-end">
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="mr-2 mb-4 animate-pulse hover:animate-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </TooltipTrigger>
          <TooltipContent 
            side="left" 
            className="max-w-[200px] bg-primary/5 backdrop-blur-sm border-primary/20"
            sideOffset={5}
          >
            <p className="text-sm">
              ✨ Click to customize the background animation! Adjust particle count, size, speed, and more.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="w-80 mr-4 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Particle Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Particle Count</Label>
                  <Slider 
                    value={[settings.count]}
                    onValueChange={([value]) => handleChange("count", value)}
                    min={500}
                    max={5000}
                    step={100}
                  />
                  <div className="text-sm text-muted-foreground">{settings.count}</div>
                </div>

                <div className="space-y-2">
                  <Label>Particle Size</Label>
                  <Slider 
                    value={[settings.size * 1000]}
                    onValueChange={([value]) => handleChange("size", value / 1000)}
                    min={10}
                    max={100}
                    step={1}
                  />
                  <div className="text-sm text-muted-foreground">{settings.size.toFixed(3)}</div>
                </div>

                <div className="space-y-2">
                  <Label>Animation Speed</Label>
                  <Slider 
                    value={[settings.speed * 100]}
                    onValueChange={([value]) => handleChange("speed", value / 100)}
                    min={10}
                    max={200}
                    step={10}
                  />
                  <div className="text-sm text-muted-foreground">{settings.speed.toFixed(2)}x</div>
                </div>

                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color" 
                      value={settings.color}
                      onChange={(e) => handleChange("color", e.target.value)}
                      className="w-12 h-8 p-1"
                    />
                    <Input 
                      value={settings.color}
                      onChange={(e) => handleChange("color", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Opacity</Label>
                  <Slider 
                    value={[settings.opacity * 100]}
                    onValueChange={([value]) => handleChange("opacity", value / 100)}
                    min={10}
                    max={100}
                    step={5}
                  />
                  <div className="text-sm text-muted-foreground">{settings.opacity.toFixed(2)}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}