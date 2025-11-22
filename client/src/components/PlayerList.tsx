import { PlayerAvatar } from './PlayerAvatar';
import { SignalIndicator } from './SignalIndicator';
import { cn } from '@/lib/utils';

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
  signalStrength: number;
}

interface PlayerListProps {
  players: Player[];
  activePlayerId?: string;
  className?: string;
}

export function PlayerList({ players, activePlayerId, className }: PlayerListProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {players.map((player) => (
        <div
          key={player.id}
          className={cn(
            "flex items-center gap-3 p-3 rounded-md border transition-all",
            activePlayerId === player.id 
              ? "border-primary bg-primary/10 glow-pulse" 
              : "border-border bg-card/30"
          )}
          data-testid={`player-${player.id}`}
        >
          <PlayerAvatar 
            name={player.name} 
            isActive={activePlayerId === player.id}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold truncate text-sm">
                {player.name}
              </p>
              {player.isHost && (
                <span className="text-xs px-2 py-0.5 bg-secondary/20 text-secondary rounded">
                  HOST
                </span>
              )}
            </div>
          </div>
          <SignalIndicator strength={player.signalStrength} />
        </div>
      ))}
    </div>
  );
}
