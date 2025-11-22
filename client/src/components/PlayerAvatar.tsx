import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PlayerAvatarProps {
  name: string;
  isActive?: boolean;
  isImpostor?: boolean;
  className?: string;
}

export function PlayerAvatar({ name, isActive, isImpostor, className }: PlayerAvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={cn(
      "border-2",
      isActive && "border-primary glow-pulse",
      isImpostor && "border-destructive",
      !isActive && !isImpostor && "border-muted-foreground",
      className
    )}>
      <AvatarFallback className={cn(
        "font-bold",
        isActive && "bg-primary/20 text-primary",
        isImpostor && "bg-destructive/20 text-destructive",
        !isActive && !isImpostor && "bg-muted text-muted-foreground"
      )}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
