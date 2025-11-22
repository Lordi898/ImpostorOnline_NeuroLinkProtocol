import { SignalIndicator } from '../SignalIndicator';

export default function SignalIndicatorExample() {
  return (
    <div className="flex gap-8 p-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <SignalIndicator strength={25} />
        <span className="text-xs">WEAK</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SignalIndicator strength={50} />
        <span className="text-xs">MEDIUM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SignalIndicator strength={100} />
        <span className="text-xs">STRONG</span>
      </div>
    </div>
  );
}
