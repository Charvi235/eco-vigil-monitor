import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { sensors as initialSensors, jitterSensor } from '@/lib/mockData';
import { Wifi, WifiOff, Battery, Clock, Plus, Radio } from 'lucide-react';
import type { Sensor } from '@/lib/types';

export default function IoTPanel() {
  const [sensorList, setSensorList] = useState<Sensor[]>(initialSensors);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorList(prev => prev.map(s => (s.online ? jitterSensor(s) : s)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onlineCount = sensorList.filter(s => s.online).length;

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">IoT Sensor Network</h1>
          <p className="text-sm text-muted-foreground">{onlineCount}/{sensorList.length} sensors online</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add Sensor
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensorList.map(sensor => (
          <Card key={sensor.id} className={!sensor.online ? 'opacity-60' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-primary" />
                  <CardTitle className="text-sm font-semibold">{sensor.name}</CardTitle>
                </div>
                <Badge variant={sensor.online ? 'default' : 'secondary'} className="text-xs">
                  {sensor.online ? (
                    <><Wifi className="w-3 h-3 mr-1" /> Online</>
                  ) : (
                    <><WifiOff className="w-3 h-3 mr-1" /> Offline</>
                  )}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{sensor.region}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="text-muted-foreground">Vegetation</span>
                <span className="font-medium text-foreground">{sensor.vegetationType}</span>
                <span className="text-muted-foreground">Coordinates</span>
                <span className="font-medium text-foreground">{sensor.lat.toFixed(2)}, {sensor.lng.toFixed(2)}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Battery className="w-3 h-3" /> Battery
                  </span>
                  <span className={`font-medium ${sensor.battery < 20 ? 'text-destructive' : sensor.battery < 50 ? 'text-risk-moderate' : 'text-primary'}`}>
                    {sensor.battery}%
                  </span>
                </div>
                <Progress value={sensor.battery} className="h-1.5" />
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                Last updated: {sensor.lastUpdated.toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
