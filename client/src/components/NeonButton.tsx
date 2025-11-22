import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends ButtonProps {
  neonColor?: 'green' | 'red' | 'cyan';
}

export function NeonButton({ 
  className, 
  neonColor = 'green', 
  children, 
  variant = 'default',
  ...props 
}: NeonButtonProps) {
  const borderGlowClass = neonColor === 'green' 
    ? 'shadow-[0_0_10px_rgba(0,255,0,0.5)]' 
    : neonColor === 'red' 
    ? 'shadow-[0_0_10px_rgba(255,0,0,0.5)]' 
    : 'shadow-[0_0_10px_rgba(0,255,255,0.5)]';

  return (
    <Button
      variant={variant}
      className={cn(
        "border-2 font-bold tracking-widest transition-shadow",
        borderGlowClass,
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
