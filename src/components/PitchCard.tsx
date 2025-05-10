import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PitchCard({
  pitch,
  onConnect,
}: {
  pitch: any;
  onConnect: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{pitch.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{pitch.description}</p>
        {pitch.marketSize && (
          <p>
            <strong>Market Size:</strong> {pitch.marketSize}
          </p>
        )}
        {pitch.traction && (
          <p>
            <strong>Traction:</strong> {pitch.traction}
          </p>
        )}
        <Button onClick={onConnect} className="mt-4">
          Connect
        </Button>
      </CardContent>
    </Card>
  );
}
