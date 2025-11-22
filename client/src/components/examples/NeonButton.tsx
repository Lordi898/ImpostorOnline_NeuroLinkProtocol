import { NeonButton } from '../NeonButton';

export default function NeonButtonExample() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <NeonButton neonColor="green" onClick={() => console.log('Green clicked')}>
        INITIALIZE
      </NeonButton>
      <NeonButton neonColor="red" variant="destructive" onClick={() => console.log('Red clicked')}>
        TERMINATE
      </NeonButton>
      <NeonButton neonColor="cyan" variant="secondary" onClick={() => console.log('Cyan clicked')}>
        ANALYZE
      </NeonButton>
    </div>
  );
}
