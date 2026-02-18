import { useState, useEffect, useMemo } from 'react';
import { Thermometer, Droplets, Wind, Gauge, CloudRain, Flame, Eye, Waves } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { sensors as initialSensors, generateTimeSeries, jitterSensor, alerts } from '@/lib/mockData';
import { predictRisk } from '@/lib/fireRiskEngine';
import RiskIndicator from '@/components/RiskIndicator';
import SensorCard from '@/components/SensorCard';
import type { Sensor } from '@/lib/types';

export default function Dashboard() {
  const [sensorList, setSensorList] = useState<Sensor[]>(initialSensors);
  const [selectedId, setSelectedId] = useState(initialSensors[0].id);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorList(prev => prev.map(s => (s.online ? jitterSensor(s) : s)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sensor = sensorList.find(s => s.id === selectedId)!;
  const prediction = useMemo(() => predictRisk(sensor), [sensor]);
  const timeSeries = useMemo(() => generateTimeSeries(sensor), [sensor]);
  const recentAlerts = alerts.filter(a => !a.acknowledged).slice(0, 3);

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Live Monitoring Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time sensor data and AI fire risk prediction</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-1.5" />
            Live
          </Badge>
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sensorList.map(s => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name} — {s.region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Risk Indicator */}
      <RiskIndicator level={prediction.level} probability={prediction.probability} explanation={prediction.explanation} />

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SensorCard icon={Thermometer} label="Temperature" value={sensor.temperature} unit="°C" />
        <SensorCard icon={Droplets} label="Humidity" value={sensor.humidity} unit="%" />
        <SensorCard icon={Waves} label="Soil Moisture" value={sensor.soilMoisture} unit="%" />
        <SensorCard icon={Wind} label="Wind Speed" value={sensor.windSpeed} unit="km/h" />
        <SensorCard icon={Gauge} label="Pressure" value={sensor.pressure} unit="hPa" />
        <SensorCard icon={CloudRain} label="Rainfall (24h)" value={sensor.rainfall} unit="mm" />
        <SensorCard icon={Flame} label="CO₂ Level" value={sensor.co2} unit="ppm" />
        <SensorCard icon={Eye} label="Smoke Index" value={sensor.smoke} unit="%" />
      </div>

      {/* Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">24-Hour Trend — {sensor.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="hsl(var(--chart-4))" name="Temp (°C)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="humidity" stroke="hsl(var(--chart-2))" name="Humidity (%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="smoke" stroke="hsl(var(--chart-3))" name="Smoke (%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      {recentAlerts.length > 0 && (
        <Card className="border-risk-high/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">⚠️ Active Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentAlerts.map(a => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <RiskIndicator level={a.level} probability={0} explanation="" compact />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{a.sensorName} — {a.region}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.message}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {a.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
