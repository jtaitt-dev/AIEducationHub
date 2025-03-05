import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

  const handleChange = (key: keyof ParticleSettings, value: number | string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-background/80 backdrop-blur-sm">
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
  );
}
