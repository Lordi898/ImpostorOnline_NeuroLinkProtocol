import { useState } from 'react';
import { QRCodeDisplay } from '../QRCodeDisplay';
import { PlayerList, type Player } from '../PlayerList';
import { TerminalCard } from '../TerminalCard';
import { NeonButton } from '../NeonButton';
import { GlitchText } from '../GlitchText';
import { Chat } from '../Chat';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { type ChatMessage } from '@/lib/gameState';

interface LobbyScreenProps {
  roomCode: string;
  players: Player[];
  isHost: boolean;
  onStartGame: () => void;
  playOnHost: boolean;
  onPlayOnHostChange: (value: boolean) => void;
  chatMessages: ChatMessage[];
  onSendChatMessage: (text: string) => void;
  localPlayerId: string;
}

export function LobbyScreen({
  roomCode,
  players,
  isHost,
  onStartGame,
  playOnHost,
  onPlayOnHostChange,
  chatMessages,
  onSendChatMessage,
  localPlayerId
}: LobbyScreenProps) {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center gap-8">
      <GlitchText className="text-4xl md:text-6xl text-center">
        NEURO-LINK
      </GlitchText>
      <p className="text-secondary text-sm">PROTOCOL ZERO</p>

      <div className="w-full max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <QRCodeDisplay value={`NEURO-LINK://JOIN/${roomCode}`} size={200} />
          
          {isHost && (
            <TerminalCard title="HOST SETTINGS">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="play-on-host" className="text-sm">
                  PLAY ON THIS DEVICE
                </Label>
                <Switch
                  id="play-on-host"
                  checked={playOnHost}
                  onCheckedChange={onPlayOnHostChange}
                  data-testid="switch-play-on-host"
                />
              </div>
            </TerminalCard>
          )}
        </div>

        <TerminalCard title="CONNECTED USERS">
          <PlayerList players={players} />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {players.length} / 10 PLAYERS
          </div>
        </TerminalCard>

        <div className="md:col-span-2 lg:col-span-1">
          <Chat
            messages={chatMessages}
            onSendMessage={onSendChatMessage}
            localPlayerId={localPlayerId}
            className="min-h-[300px]"
          />
        </div>
      </div>

      {isHost && players.length >= 3 && (
        <NeonButton 
          size="lg"
          onClick={onStartGame}
          data-testid="button-start-game"
          className="min-w-[200px]"
        >
          INITIATE PROTOCOL
        </NeonButton>
      )}

      {isHost && players.length < 3 && (
        <p className="text-muted-foreground text-sm">
          MINIMUM 3 PLAYERS REQUIRED
        </p>
      )}
    </div>
  );
}
