import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TimerDisplayProps {
  timeRemaining: number;
  maxTime: number;
  className?: string;
}

export function TimerDisplay({ timeRemaining, maxTime, className }: TimerDisplayProps) {
  const percentage = (timeRemaining / maxTime) * 100;
  const isLow = timeRemaining <= 5;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-baseline">
        <span className="text-xs text-muted-foreground">TIME REMAINING</span>
        <span className={cn(
          "text-3xl font-bold tabular-nums",
          isLow ? "text-destructive text-glow-red animate-pulse" : "text-primary text-glow-green"
        )}>
          {timeRemaining}S
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={cn(
          "h-2 bg-muted",
          isLow && "glow-pulse"
        )}
      />
    </div>
  );
}
