import { RoleRevealScreen } from '../../game/RoleRevealScreen';

export default function RoleRevealScreenExample() {
  return (
    <RoleRevealScreen
      isImpostor={false}
      secretWord="CYBERDECK"
      category="TECH"
      onRevealComplete={() => console.log('Reveal complete')}
    />
  );
}
