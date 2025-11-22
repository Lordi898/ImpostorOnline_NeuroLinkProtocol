import { TerminalCard } from '../TerminalCard';

export default function TerminalCardExample() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <TerminalCard title="SYSTEM STATUS">
        <p className="text-sm text-muted-foreground">ALL SYSTEMS OPERATIONAL</p>
      </TerminalCard>
      <TerminalCard title="PLAYER COUNT" scanline={false}>
        <p className="text-3xl font-bold text-primary">05</p>
      </TerminalCard>
    </div>
  );
}
