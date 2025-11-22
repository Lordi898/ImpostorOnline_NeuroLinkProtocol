import { PlayerAvatar } from '../PlayerAvatar';

export default function PlayerAvatarExample() {
  return (
    <div className="flex gap-4 p-8">
      <div className="flex flex-col items-center gap-2">
        <PlayerAvatar name="HACKER ONE" />
        <span className="text-xs">IDLE</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PlayerAvatar name="CYBER NINJA" isActive />
        <span className="text-xs">ACTIVE</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PlayerAvatar name="GLITCH MASTER" isImpostor />
        <span className="text-xs">IMPOSTOR</span>
      </div>
    </div>
  );
}
