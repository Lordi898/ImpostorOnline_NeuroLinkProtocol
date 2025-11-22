import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GlitchText({ children, className, animate = false }: GlitchTextProps) {
  return (
    <span className={cn(
      "text-glow-green font-bold",
      animate && "glitch-effect",
      className
    )}>
      {children}
    </span>
  );
}
