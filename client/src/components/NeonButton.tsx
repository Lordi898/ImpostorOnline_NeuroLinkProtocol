import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends ButtonProps {
  neonColor?: 'green' | 'red' | 'cyan';
}

export function NeonButton({ 
  className, 
  neonColor = 'green', 
  children, 
  ...props 
}: NeonButtonProps) {
  const glowClass = neonColor === 'green' 
    ? 'text-glow-green' 
    : neonColor === 'red' 
    ? 'text-glow-red' 
    : 'text-glow-cyan';

  return (
    <Button
      className={cn(
        "border-2 font-bold tracking-widest",
        glowClass,
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
