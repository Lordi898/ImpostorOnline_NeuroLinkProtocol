import { JoinScreen } from '../../game/JoinScreen';

export default function JoinScreenExample() {
  return (
    <JoinScreen
      onCreateRoom={(name) => console.log('Create room:', name)}
      onJoinRoom={(name, code) => console.log('Join room:', name, code)}
    />
  );
}
