
import { GlitchText } from '../GlitchText';
import { QRCodeDisplay } from '../QRCodeDisplay';
import { PlayerList, type Player } from '../PlayerList';
import { TerminalCard } from '../TerminalCard';
import { NeonButton } from '../NeonButton';
import { Chat } from '../Chat';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type ChatMessage } from '@/lib/gameState';
import { useLanguage } from '@/lib/languageContext';

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
  const { language, setLanguage, theme, setTheme, t } = useLanguage();

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center gap-8">
      <GlitchText className="text-4xl md:text-6xl text-center">
        {t('neuroLink')}
      </GlitchText>
      <p className="text-secondary text-sm">{t('protocolZero')}</p>

      {/* Theme and Language Selectors */}
      <div className="flex gap-4 flex-wrap justify-center">
        <div className="flex flex-col gap-2">
          <Label className="text-xs">{t('theme')}</Label>
          <Select value={theme} onValueChange={(value) => setTheme(value as 'dark' | 'normal' | 'light')}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">{t('themeDark')}</SelectItem>
              <SelectItem value="normal">{t('themeNormal')}</SelectItem>
              <SelectItem value="light">{t('themeLight')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-xs">{t('language')}</Label>
          <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'es')}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">ENGLISH</SelectItem>
              <SelectItem value="es">ESPAÑOL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <QRCodeDisplay value={`NEURO-LINK://JOIN/${roomCode}`} size={200} />
          
          {isHost && (
            <TerminalCard title={t('hostSettings')}>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="play-on-host" className="text-sm">
                  {t('playOnThisDevice')}
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

        <TerminalCard title={t('connectedUsers')}>
          <PlayerList players={players} />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {players.length} / 30 {t('playersCount')}
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
          {t('initiateProtocol')}
        </NeonButton>
      )}

      {isHost && players.length < 3 && (
        <p className="text-muted-foreground text-sm">
          {t('minimumPlayers')}
        </p>
      )}
    </div>
  );
}
