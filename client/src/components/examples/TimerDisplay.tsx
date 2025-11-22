import { TimerDisplay } from '../TimerDisplay';

export default function TimerDisplayExample() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <TimerDisplay timeRemaining={15} maxTime={15} />
      <TimerDisplay timeRemaining={8} maxTime={15} />
      <TimerDisplay timeRemaining={3} maxTime={15} />
    </div>
  );
}
