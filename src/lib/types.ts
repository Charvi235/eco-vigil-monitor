export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type WindDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export interface Sensor {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  vegetationType: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  windSpeed: number;
  windDirection: WindDirection;
  pressure: number;
  rainfall: number;
  co2: number;
  smoke: number;
  irValue: number;
  online: boolean;
  battery: number;
  lastUpdated: Date;
}

export interface RiskPrediction {
  level: RiskLevel;
  probability: number;
  explanation: string;
  probabilities: Record<RiskLevel, number>;
}

export interface Alert {
  id: string;
  sensorId: string;
  sensorName: string;
  region: string;
  level: RiskLevel;
  message: string;
  timestamp: Date;
  emailSent: boolean;
  smsSent: boolean;
  acknowledged: boolean;
}

export interface HistoricalRecord {
  id: string;
  date: Date;
  sensorId: string;
  sensorName: string;
  region: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  smoke: number;
  predictedRisk: RiskLevel;
  probability: number;
  actualFire: boolean;
}

export interface TimeSeriesPoint {
  time: string;
  temperature: number;
  humidity: number;
  smoke: number;
  windSpeed: number;
}
