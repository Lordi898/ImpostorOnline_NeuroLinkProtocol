import { VotingScreen } from '../../game/VotingScreen';
import { type Player } from '../../PlayerList';

const mockPlayers: Player[] = [
  { id: '1', name: 'CIPHER', isHost: true, signalStrength: 100 },
  { id: '2', name: 'GHOST', isHost: false, signalStrength: 75 },
  { id: '3', name: 'NEO', isHost: false, signalStrength: 100 },
  { id: '4', name: 'TRINITY', isHost: false, signalStrength: 50 },
];

export default function VotingScreenExample() {
  return (
    <VotingScreen
      players={mockPlayers}
      onVote={(id) => console.log('Voted for:', id)}
    />
  );
}
