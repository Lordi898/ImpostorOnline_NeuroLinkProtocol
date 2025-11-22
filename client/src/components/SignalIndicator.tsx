import { cn } from "@/lib/utils";

interface SignalIndicatorProps {
  strength: number;
  className?: string;
}

export function SignalIndicator({ strength, className }: SignalIndicatorProps) {
  const bars = [25, 50, 75, 100];
  
  return (
    <div className={cn("flex items-end gap-0.5", className)}>
      {bars.map((threshold, index) => (
        <div
          key={index}
          className={cn(
            "w-1 transition-all",
            strength >= threshold ? "bg-primary" : "bg-muted-foreground/20"
          )}
          style={{ height: `${(index + 1) * 4}px` }}
        />
      ))}
    </div>
  );
}
