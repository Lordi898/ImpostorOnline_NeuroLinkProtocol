import { QRCodeDisplay } from '../QRCodeDisplay';

export default function QRCodeDisplayExample() {
  return (
    <div className="p-8">
      <QRCodeDisplay value="NEURO-LINK://JOIN/ABC123" size={180} />
    </div>
  );
}
