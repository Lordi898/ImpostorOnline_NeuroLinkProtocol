import { PlayerList, type Player } from '../PlayerList';

const mockPlayers: Player[] = [
  { id: '1', name: 'CIPHER', isHost: true, signalStrength: 100 },
  { id: '2', name: 'GHOST', isHost: false, signalStrength: 75 },
  { id: '3', name: 'NEO', isHost: false, signalStrength: 50 },
  { id: '4', name: 'TRINITY', isHost: false, signalStrength: 100 },
];

export default function PlayerListExample() {
  return (
    <div className="p-8 max-w-md">
      <PlayerList players={mockPlayers} activePlayerId="2" />
    </div>
  );
}
