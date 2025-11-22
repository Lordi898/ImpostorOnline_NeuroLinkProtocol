import { useState } from 'react';
import { PlayerAvatar } from '../PlayerAvatar';
import { TerminalCard } from '../TerminalCard';
import { NeonButton } from '../NeonButton';
import { GlitchText } from '../GlitchText';
import { type Player } from '../PlayerList';
import { cn } from '@/lib/utils';

interface VotingScreenProps {
  players: Player[];
  onVote: (playerId: string) => void;
  votedPlayerId?: string;
}

export function VotingScreen({ players, onVote, votedPlayerId }: VotingScreenProps) {
  const [selectedId, setSelectedId] = useState<string | null>(votedPlayerId || null);

  const handleVote = (playerId: string) => {
    setSelectedId(playerId);
    onVote(playerId);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-8">
      <div className="text-center">
        <GlitchText className="text-4xl md:text-6xl block">
          VOTE TO ELIMINATE
        </GlitchText>
        <p className="text-secondary mt-2">SELECT THE SUSPECTED IMPOSTOR</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
        {players.map((player) => (
          <button
            key={player.id}
            onClick={() => handleVote(player.id)}
            className={cn(
              "p-4 rounded-md border-2 transition-all hover-elevate active-elevate-2",
              selectedId === player.id
                ? "border-destructive bg-destructive/20 glow-pulse"
                : "border-border bg-card/30"
            )}
            data-testid={`button-vote-${player.id}`}
          >
            <div className="flex flex-col items-center gap-3">
              <PlayerAvatar 
                name={player.name} 
                isImpostor={selectedId === player.id}
                className="w-16 h-16"
              />
              <p className="text-sm font-semibold text-center">
                {player.name}
              </p>
              {selectedId === player.id && (
                <span className="text-xs text-destructive">SELECTED</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedId && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            WAITING FOR OTHER PLAYERS...
          </p>
        </div>
      )}
    </div>
  );
}
