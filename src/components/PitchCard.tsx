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
    <Card className="w-full max-w-md mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg py-0">
      <CardHeader className="border-b bg-gradient-to-r from-blue-300 to-purple-300 py-auto">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {pitch.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-gray-600 leading-relaxed">{pitch.description}</p>
        {pitch.marketSize && (
          <div className="flex items-center space-x-2 text-gray-700">
            <strong className="text-sm uppercase tracking-wide">
              Market Size:
            </strong>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              {pitch.marketSize}
            </span>
          </div>
        )}
        {pitch.traction && (
          <div className="flex items-center space-x-2 text-gray-700">
            <strong className="text-sm uppercase tracking-wide">
              Traction:
            </strong>
            <span className="bg-green-50 px-3 py-1 rounded-full">
              {pitch.traction}
            </span>
          </div>
        )}
        <Button
          onClick={onConnect}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Connect
        </Button>
      </CardContent>
    </Card>
  );
}
