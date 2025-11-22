import { useState } from 'react';
import { GlitchText } from '../GlitchText';
import { NeonButton } from '../NeonButton';
import { TerminalCard } from '../TerminalCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface JoinScreenProps {
  onCreateRoom: (playerName: string) => void;
  onJoinRoom: (playerName: string, roomCode: string) => void;
}

export function JoinScreen({ onCreateRoom, onJoinRoom }: JoinScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [mode, setMode] = useState<'menu' | 'create' | 'join'>('menu');

  const handleCreateRoom = () => {
    if (playerName.trim()) {
      onCreateRoom(playerName.toUpperCase());
    }
  };

  const handleJoinRoom = () => {
    if (playerName.trim() && roomCode.trim()) {
      onJoinRoom(playerName.toUpperCase(), roomCode.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center gap-8 scanline">
      <div className="text-center space-y-4">
        <GlitchText className="text-5xl md:text-7xl block">
          NEURO-LINK
        </GlitchText>
        <p className="text-secondary text-lg">PROTOCOL ZERO</p>
        <p className="text-sm text-muted-foreground max-w-md">
          A P2P CYBERPUNK SOCIAL DEDUCTION GAME
        </p>
      </div>

      {mode === 'menu' && (
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <NeonButton 
            size="lg"
            onClick={() => setMode('create')}
            data-testid="button-create-room"
            className="w-full"
          >
            HOST GAME
          </NeonButton>
          <NeonButton 
            variant="outline"
            size="lg"
            onClick={() => setMode('join')}
            data-testid="button-join-room"
            className="w-full"
          >
            JOIN GAME
          </NeonButton>
        </div>
      )}

      {mode === 'create' && (
        <TerminalCard title="HOST NEW GAME" className="w-full max-w-md">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="player-name">PLAYER NAME</Label>
              <Input
                id="player-name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="ENTER YOUR NAME"
                className="uppercase"
                maxLength={20}
                data-testid="input-player-name"
              />
            </div>
            <div className="flex gap-2">
              <NeonButton 
                onClick={handleCreateRoom}
                disabled={!playerName.trim()}
                data-testid="button-confirm-create"
                className="flex-1"
              >
                CREATE
              </NeonButton>
              <NeonButton 
                variant="outline"
                onClick={() => setMode('menu')}
                data-testid="button-back"
              >
                BACK
              </NeonButton>
            </div>
          </div>
        </TerminalCard>
      )}

      {mode === 'join' && (
        <TerminalCard title="JOIN EXISTING GAME" className="w-full max-w-md">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="player-name-join">PLAYER NAME</Label>
              <Input
                id="player-name-join"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="ENTER YOUR NAME"
                className="uppercase"
                maxLength={20}
                data-testid="input-player-name-join"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="room-code">ROOM CODE</Label>
              <Input
                id="room-code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="ENTER ROOM CODE"
                className="uppercase"
                maxLength={10}
                data-testid="input-room-code"
              />
            </div>
            <div className="flex gap-2">
              <NeonButton 
                onClick={handleJoinRoom}
                disabled={!playerName.trim() || !roomCode.trim()}
                data-testid="button-confirm-join"
                className="flex-1"
              >
                JOIN
              </NeonButton>
              <NeonButton 
                variant="outline"
                onClick={() => setMode('menu')}
                data-testid="button-back-join"
              >
                BACK
              </NeonButton>
            </div>
          </div>
        </TerminalCard>
      )}
    </div>
  );
}
