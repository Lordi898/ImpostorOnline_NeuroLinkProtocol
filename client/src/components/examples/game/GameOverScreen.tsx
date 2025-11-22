import { GameOverScreen } from '../../game/GameOverScreen';
import { type Player } from '../../PlayerList';
import { cn } from '@/lib/utils';

const mockImpostor: Player = {
  id: '2',
  name: 'GHOST',
  isHost: false,
  signalStrength: 75
};

export default function GameOverScreenExample() {
  return (
    <GameOverScreen
      winner="hackers"
      impostorPlayer={mockImpostor}
      onPlayAgain={() => console.log('Play again')}
      onBackToLobby={() => console.log('Back to lobby')}
    />
  );
}
