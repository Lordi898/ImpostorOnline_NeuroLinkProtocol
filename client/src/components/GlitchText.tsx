import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  retro?: boolean;
}

export function GlitchText({ children, className, animate = false, retro = false }: GlitchTextProps) {
  return (
    <span className={cn(
      "text-glow-green font-bold",
      animate && "glitch-effect",
      retro && "retro-title",
      className
    )}>
      {children}
    </span>
  );
}
