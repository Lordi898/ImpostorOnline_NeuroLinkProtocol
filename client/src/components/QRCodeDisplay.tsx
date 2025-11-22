import { QRCodeSVG } from 'qrcode.react';
import { TerminalCard } from './TerminalCard';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

export function QRCodeDisplay({ value, size = 200 }: QRCodeDisplayProps) {
  return (
    <TerminalCard title="SCAN TO JOIN" className="inline-block">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-white p-4 rounded-md">
          <QRCodeSVG 
            value={value} 
            size={size}
            level="H"
            includeMargin={false}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center max-w-[200px] break-all">
          {value}
        </p>
      </div>
    </TerminalCard>
  );
}
