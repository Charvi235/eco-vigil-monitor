import { Sensor, Alert, HistoricalRecord, TimeSeriesPoint, RiskLevel } from './types';

export const sensors: Sensor[] = [
  {
    id: 's1', name: 'Corbett Alpha', region: 'Jim Corbett National Park',
    lat: 29.5300, lng: 78.7700, vegetationType: 'Sal Forest',
    temperature: 38, humidity: 28, soilMoisture: 15, windSpeed: 22,
    windDirection: 'NW', pressure: 1008, rainfall: 0, co2: 520, smoke: 45, irValue: 78,
    online: true, battery: 87, lastUpdated: new Date(),
  },
  {
    id: 's2', name: 'Sundarbans Beta', region: 'Sundarbans Reserve',
    lat: 21.9497, lng: 89.1833, vegetationType: 'Mangrove',
    temperature: 32, humidity: 72, soilMoisture: 68, windSpeed: 12,
    windDirection: 'S', pressure: 1012, rainfall: 5.2, co2: 390, smoke: 8, irValue: 22,
    online: true, battery: 92, lastUpdated: new Date(),
  },
  {
    id: 's3', name: 'Ghats Gamma', region: 'Western Ghats',
    lat: 11.3500, lng: 76.9500, vegetationType: 'Tropical Evergreen',
    temperature: 29, humidity: 65, soilMoisture: 55, windSpeed: 8,
    windDirection: 'E', pressure: 1015, rainfall: 12, co2: 370, smoke: 5, irValue: 18,
    online: true, battery: 78, lastUpdated: new Date(),
  },
  {
    id: 's4', name: 'Kaziranga Delta', region: 'Kaziranga National Park',
    lat: 26.5775, lng: 93.1711, vegetationType: 'Grassland',
    temperature: 35, humidity: 42, soilMoisture: 30, windSpeed: 18,
    windDirection: 'NE', pressure: 1010, rainfall: 0.5, co2: 440, smoke: 28, irValue: 55,
    online: true, battery: 64, lastUpdated: new Date(),
  },
  {
    id: 's5', name: 'Gir Epsilon', region: 'Gir Forest',
    lat: 21.1243, lng: 70.8242, vegetationType: 'Dry Deciduous',
    temperature: 42, humidity: 18, soilMoisture: 8, windSpeed: 28,
    windDirection: 'W', pressure: 1005, rainfall: 0, co2: 610, smoke: 72, irValue: 92,
    online: true, battery: 45, lastUpdated: new Date(),
  },
  {
    id: 's6', name: 'Bandipur Zeta', region: 'Bandipur National Park',
    lat: 11.6686, lng: 76.6337, vegetationType: 'Deciduous Forest',
    temperature: 34, humidity: 38, soilMoisture: 22, windSpeed: 15,
    windDirection: 'SE', pressure: 1009, rainfall: 1, co2: 480, smoke: 35, irValue: 60,
    online: false, battery: 12, lastUpdated: new Date(Date.now() - 3600000),
  },
  {
    id: 's7', name: 'Ranthambore Eta', region: 'Ranthambore',
    lat: 26.0173, lng: 76.5026, vegetationType: 'Dry Deciduous',
    temperature: 40, humidity: 22, soilMoisture: 12, windSpeed: 25,
    windDirection: 'NW', pressure: 1006, rainfall: 0, co2: 560, smoke: 58, irValue: 85,
    online: true, battery: 71, lastUpdated: new Date(),
  },
  {
    id: 's8', name: 'Nilgiri Theta', region: 'Nilgiri Hills',
    lat: 11.4916, lng: 76.7337, vegetationType: 'Shola Grassland',
    temperature: 24, humidity: 78, soilMoisture: 70, windSpeed: 6,
    windDirection: 'N', pressure: 1018, rainfall: 18, co2: 350, smoke: 3, irValue: 12,
    online: true, battery: 95, lastUpdated: new Date(),
  },
];

export function generateTimeSeries(sensor: Sensor): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 3600000);
    const hourLabel = t.getHours().toString().padStart(2, '0') + ':00';
    const vary = (base: number, range: number) => +(base + (Math.random() - 0.5) * range).toFixed(1);
    points.push({
      time: hourLabel,
      temperature: vary(sensor.temperature, 8),
      humidity: vary(sensor.humidity, 15),
      smoke: Math.max(0, vary(sensor.smoke, 20)),
      windSpeed: Math.max(0, vary(sensor.windSpeed, 10)),
    });
  }
  return points;
}

const riskLevels: RiskLevel[] = ['low', 'moderate', 'high', 'critical'];

export const alerts: Alert[] = [
  { id: 'a1', sensorId: 's5', sensorName: 'Gir Epsilon', region: 'Gir Forest', level: 'critical', message: 'Extreme fire risk: temperature 42°C, humidity 18%, high smoke detected.', timestamp: new Date(Date.now() - 300000), emailSent: true, smsSent: true, acknowledged: false },
  { id: 'a2', sensorId: 's7', sensorName: 'Ranthambore Eta', region: 'Ranthambore', level: 'high', message: 'High fire risk: dry conditions with strong winds at 25 km/h.', timestamp: new Date(Date.now() - 1200000), emailSent: true, smsSent: true, acknowledged: false },
  { id: 'a3', sensorId: 's1', sensorName: 'Corbett Alpha', region: 'Jim Corbett', level: 'high', message: 'Elevated risk: low humidity and rising CO₂ levels detected.', timestamp: new Date(Date.now() - 3600000), emailSent: true, smsSent: false, acknowledged: true },
  { id: 'a4', sensorId: 's4', sensorName: 'Kaziranga Delta', region: 'Kaziranga', level: 'moderate', message: 'Moderate risk: smoke levels rising, monitor closely.', timestamp: new Date(Date.now() - 7200000), emailSent: true, smsSent: false, acknowledged: true },
  { id: 'a5', sensorId: 's6', sensorName: 'Bandipur Zeta', region: 'Bandipur', level: 'high', message: 'Sensor offline with last reading showing high risk conditions.', timestamp: new Date(Date.now() - 10800000), emailSent: true, smsSent: true, acknowledged: false },
];

export const historicalRecords: HistoricalRecord[] = Array.from({ length: 30 }, (_, i) => {
  const s = sensors[i % sensors.length];
  const risk = riskLevels[Math.floor(Math.random() * 4)];
  return {
    id: `h${i}`,
    date: new Date(Date.now() - i * 3600000 * 4),
    sensorId: s.id,
    sensorName: s.name,
    region: s.region,
    temperature: +(s.temperature + (Math.random() - 0.5) * 10).toFixed(1),
    humidity: +(s.humidity + (Math.random() - 0.5) * 20).toFixed(1),
    windSpeed: +(s.windSpeed + (Math.random() - 0.5) * 10).toFixed(1),
    smoke: +(s.smoke + (Math.random() - 0.5) * 15).toFixed(1),
    predictedRisk: risk,
    probability: +(60 + Math.random() * 35).toFixed(1),
    actualFire: risk === 'critical' && Math.random() > 0.6,
  };
});

export function jitterSensor(s: Sensor): Sensor {
  const v = (val: number, range: number, min = 0, max = 999) =>
    Math.min(max, Math.max(min, +(val + (Math.random() - 0.5) * range).toFixed(1)));
  return {
    ...s,
    temperature: v(s.temperature, 2, -10, 55),
    humidity: v(s.humidity, 3, 0, 100),
    soilMoisture: v(s.soilMoisture, 2, 0, 100),
    windSpeed: v(s.windSpeed, 2, 0, 80),
    pressure: v(s.pressure, 1, 950, 1050),
    co2: v(s.co2, 10, 200, 1000),
    smoke: v(s.smoke, 3, 0, 100),
    irValue: v(s.irValue, 2, 0, 100),
    lastUpdated: new Date(),
  };
}
