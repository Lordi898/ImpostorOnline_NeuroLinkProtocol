import { useState } from 'react';
import { LobbyScreen } from '../../game/LobbyScreen';
import { type Player } from '../../PlayerList';

const mockPlayers: Player[] = [
  { id: '1', name: 'CIPHER', isHost: true, signalStrength: 100 },
  { id: '2', name: 'GHOST', isHost: false, signalStrength: 75 },
  { id: '3', name: 'NEO', isHost: false, signalStrength: 100 },
];

export default function LobbyScreenExample() {
  const [playOnHost, setPlayOnHost] = useState(false);

  return (
    <LobbyScreen
      roomCode="X7K9P2"
      players={mockPlayers}
      isHost={true}
      onStartGame={() => console.log('Start game')}
      playOnHost={playOnHost}
      onPlayOnHostChange={setPlayOnHost}
    />
  );
}
