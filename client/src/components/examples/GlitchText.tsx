import { GlitchText } from '../GlitchText';

export default function GlitchTextExample() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <GlitchText className="text-4xl">
        NEURO-LINK PROTOCOL
      </GlitchText>
      <GlitchText animate className="text-2xl text-destructive">
        SIGNAL LOST
      </GlitchText>
      <GlitchText className="text-xl text-secondary">
        SYSTEM ONLINE
      </GlitchText>
    </div>
  );
}
