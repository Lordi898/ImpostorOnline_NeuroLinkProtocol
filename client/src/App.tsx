import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JoinScreen } from "@/components/game/JoinScreen";
import { LobbyScreen } from "@/components/game/LobbyScreen";
import { RoleRevealScreen } from "@/components/game/RoleRevealScreen";
import { GameplayScreen } from "@/components/game/GameplayScreen";
import { VotingScreen } from "@/components/game/VotingScreen";
import { GameOverScreen } from "@/components/game/GameOverScreen";
import { type Player } from "@/components/PlayerList";

type GamePhase = 'join' | 'lobby' | 'role-reveal' | 'gameplay' | 'voting' | 'game-over';

function App() {
  const [phase, setPhase] = useState<GamePhase>('join');
  const [playOnHost, setPlayOnHost] = useState(false);
  
  const mockPlayers: Player[] = [
    { id: '1', name: 'CIPHER', isHost: true, signalStrength: 100 },
    { id: '2', name: 'GHOST', isHost: false, signalStrength: 75 },
    { id: '3', name: 'NEO', isHost: false, signalStrength: 100 },
    { id: '4', name: 'TRINITY', isHost: false, signalStrength: 50 },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          {phase === 'join' && (
            <JoinScreen
              onCreateRoom={(name) => {
                console.log('Created room with name:', name);
                setPhase('lobby');
              }}
              onJoinRoom={(name, code) => {
                console.log('Joined room:', name, code);
                setPhase('lobby');
              }}
            />
          )}

          {phase === 'lobby' && (
            <LobbyScreen
              roomCode="X7K9P2"
              players={mockPlayers}
              isHost={true}
              onStartGame={() => setPhase('role-reveal')}
              playOnHost={playOnHost}
              onPlayOnHostChange={setPlayOnHost}
            />
          )}

          {phase === 'role-reveal' && (
            <RoleRevealScreen
              isImpostor={false}
              secretWord="CYBERDECK"
              category="TECH"
              onRevealComplete={() => setPhase('gameplay')}
            />
          )}

          {phase === 'gameplay' && (
            <GameplayScreen
              players={mockPlayers}
              activePlayerId="2"
              timeRemaining={12}
              isImpostor={false}
              isMyTurn={false}
              secretWord="CYBERDECK"
              category="TECH"
              onNoiseBomb={() => console.log('Noise bomb activated!')}
              onEndTurn={() => console.log('Turn ended')}
            />
          )}

          {phase === 'voting' && (
            <VotingScreen
              players={mockPlayers}
              onVote={(id) => console.log('Voted for:', id)}
            />
          )}

          {phase === 'game-over' && (
            <GameOverScreen
              winner="hackers"
              impostorPlayer={mockPlayers[1]}
              onPlayAgain={() => setPhase('lobby')}
              onBackToLobby={() => setPhase('join')}
            />
          )}
        </div>

        <div className="fixed bottom-4 right-4 z-50 flex gap-2 flex-wrap max-w-xs">
          <button
            onClick={() => setPhase('join')}
            className="px-3 py-1 text-xs bg-primary/20 border border-primary rounded hover-elevate active-elevate-2"
            data-testid="debug-join"
          >
            JOIN
          </button>
          <button
            onClick={() => setPhase('lobby')}
            className="px-3 py-1 text-xs bg-primary/20 border border-primary rounded hover-elevate active-elevate-2"
            data-testid="debug-lobby"
          >
            LOBBY
          </button>
          <button
            onClick={() => setPhase('role-reveal')}
            className="px-3 py-1 text-xs bg-primary/20 border border-primary rounded hover-elevate active-elevate-2"
            data-testid="debug-reveal"
          >
            REVEAL
          </button>
          <button
            onClick={() => setPhase('gameplay')}
            className="px-3 py-1 text-xs bg-primary/20 border border-primary rounded hover-elevate active-elevate-2"
            data-testid="debug-gameplay"
          >
            PLAY
          </button>
          <button
            onClick={() => setPhase('voting')}
            className="px-3 py-1 text-xs bg-primary/20 border border-primary rounded hover-elevate active-elevate-2"
            data-testid="debug-voting"
          >
            VOTE
          </button>
          <button
            onClick={() => setPhase('game-over')}
            className="px-3 py-1 text-xs bg-primary/20 border border-primary rounded hover-elevate active-elevate-2"
            data-testid="debug-gameover"
          >
            END
          </button>
        </div>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
