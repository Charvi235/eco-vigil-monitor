import { useMemo } from 'react';
import { sensors } from '@/lib/mockData';
import { predictRisk, riskColors, riskLabels } from '@/lib/fireRiskEngine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import RiskIndicator from '@/components/RiskIndicator';

export default function MapView() {
  const sensorRisks = useMemo(() =>
    sensors.map(s => ({ sensor: s, prediction: predictRisk(s) })),
    []
  );

  return (
    <div className="p-6 space-y-4 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Map View</h1>
        <p className="text-sm text-muted-foreground">Sensor locations with real-time risk assessment across India</p>
      </div>

      {/* Visual Map Representation */}
      <Card>
        <CardContent className="p-0">
          <div className="relative h-[500px] bg-secondary/30 overflow-hidden rounded-lg">
            {/* India outline background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[200px] opacity-5 select-none">🗺️</div>
            </div>
            {/* Sensor markers positioned roughly on India map */}
            {sensorRisks.map(({ sensor, prediction }) => {
              // Normalize lat/lng to percentage positions within India bounds
              const latRange = { min: 8, max: 35 };
              const lngRange = { min: 68, max: 97 };
              const top = ((latRange.max - sensor.lat) / (latRange.max - latRange.min)) * 80 + 5;
              const left = ((sensor.lng - lngRange.min) / (lngRange.max - lngRange.min)) * 80 + 10;

              return (
                <div
                  key={sensor.id}
                  className="absolute group cursor-pointer"
                  style={{ top: `${top}%`, left: `${left}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Pulse ring for critical/high */}
                  {(prediction.level === 'critical' || prediction.level === 'high') && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: riskColors[prediction.level], width: 32, height: 32, margin: -4 }}
                    />
                  )}
                  {/* Marker dot */}
                  <div
                    className="w-6 h-6 rounded-full border-2 border-card flex items-center justify-center shadow-lg relative z-10"
                    style={{ backgroundColor: riskColors[prediction.level] }}
                  >
                    <MapPin className="w-3 h-3 text-primary-foreground" />
                  </div>
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 w-64">
                    <Card className="shadow-xl">
                      <CardContent className="p-3 space-y-2">
                        <h4 className="font-bold text-sm text-foreground">{sensor.name}</h4>
                        <p className="text-xs text-muted-foreground">{sensor.region}</p>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <span>🌡 {sensor.temperature}°C</span>
                          <span>💧 {sensor.humidity}%</span>
                          <span>💨 {sensor.windSpeed} km/h</span>
                          <span>🔥 Smoke: {sensor.smoke}%</span>
                          <span>🏭 CO₂: {sensor.co2} ppm</span>
                          <span>🌧 Rain: {sensor.rainfall} mm</span>
                        </div>
                        <RiskIndicator level={prediction.level} probability={prediction.probability} explanation={prediction.explanation} compact />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sensor List */}
      <div className="grid md:grid-cols-2 gap-4">
        {sensorRisks.map(({ sensor, prediction }) => (
          <Card key={sensor.id} className="border-l-4" style={{ borderLeftColor: riskColors[prediction.level] }}>
            <CardContent className="p-4 flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: riskColors[prediction.level] + '22' }}
              >
                <MapPin className="w-5 h-5" style={{ color: riskColors[prediction.level] }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">{sensor.name}</p>
                <p className="text-xs text-muted-foreground">{sensor.region} · {sensor.lat.toFixed(2)}°N, {sensor.lng.toFixed(2)}°E</p>
              </div>
              <Badge style={{ backgroundColor: riskColors[prediction.level] }} className="text-primary-foreground text-xs">
                {prediction.level.toUpperCase()} {prediction.probability}%
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
