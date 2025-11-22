import { GameplayScreen } from '../../game/GameplayScreen';
import { type Player } from '../../PlayerList';

const mockPlayers: Player[] = [
  { id: '1', name: 'CIPHER', isHost: true, signalStrength: 100 },
  { id: '2', name: 'GHOST', isHost: false, signalStrength: 75 },
  { id: '3', name: 'NEO', isHost: false, signalStrength: 100 },
  { id: '4', name: 'TRINITY', isHost: false, signalStrength: 50 },
];

export default function GameplayScreenExample() {
  return (
    <GameplayScreen
      players={mockPlayers}
      activePlayerId="2"
      timeRemaining={12}
      isImpostor={false}
      isMyTurn={false}
      secretWord="CYBERDECK"
      category="TECH"
      onNoiseBomb={() => console.log('Noise bomb!')}
      onEndTurn={() => console.log('End turn')}
    />
  );
}
