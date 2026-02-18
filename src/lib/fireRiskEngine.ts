import { Sensor, RiskPrediction, RiskLevel } from './types';

export function predictRisk(sensor: Sensor): RiskPrediction {
  const factors: { name: string; score: number }[] = [];

  // Temperature scoring (0-25)
  if (sensor.temperature > 40) factors.push({ name: 'extreme temperature', score: 25 });
  else if (sensor.temperature > 35) factors.push({ name: 'high temperature', score: 18 });
  else if (sensor.temperature > 30) factors.push({ name: 'warm temperature', score: 10 });
  else factors.push({ name: 'moderate temperature', score: 3 });

  // Humidity scoring (0-20, inverted)
  if (sensor.humidity < 20) factors.push({ name: 'critically low humidity', score: 20 });
  else if (sensor.humidity < 35) factors.push({ name: 'low humidity', score: 14 });
  else if (sensor.humidity < 50) factors.push({ name: 'moderate humidity', score: 7 });
  else factors.push({ name: 'adequate humidity', score: 2 });

  // Wind speed (0-15)
  if (sensor.windSpeed > 25) factors.push({ name: 'strong winds', score: 15 });
  else if (sensor.windSpeed > 15) factors.push({ name: 'moderate winds', score: 10 });
  else factors.push({ name: 'light winds', score: 3 });

  // Smoke (0-20)
  if (sensor.smoke > 60) factors.push({ name: 'heavy smoke detected', score: 20 });
  else if (sensor.smoke > 30) factors.push({ name: 'elevated smoke levels', score: 13 });
  else if (sensor.smoke > 15) factors.push({ name: 'light smoke', score: 6 });
  else factors.push({ name: 'clean air', score: 1 });

  // CO2 (0-10)
  if (sensor.co2 > 550) factors.push({ name: 'high CO₂ concentration', score: 10 });
  else if (sensor.co2 > 420) factors.push({ name: 'elevated CO₂', score: 5 });
  else factors.push({ name: 'normal CO₂', score: 1 });

  // Rainfall (0-10, inverted)
  if (sensor.rainfall === 0) factors.push({ name: 'no recent rainfall', score: 10 });
  else if (sensor.rainfall < 3) factors.push({ name: 'minimal rainfall', score: 6 });
  else factors.push({ name: 'recent rainfall', score: 1 });

  const totalScore = factors.reduce((sum, f) => sum + f.score, 0);
  const maxScore = 100;
  const normalized = Math.min(totalScore / maxScore, 1);

  let level: RiskLevel;
  if (normalized >= 0.72) level = 'critical';
  else if (normalized >= 0.52) level = 'high';
  else if (normalized >= 0.32) level = 'moderate';
  else level = 'low';

  const topFactors = factors
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(f => f.name);

  const explanation = `Risk driven by ${topFactors.join(', ')}. ${
    level === 'critical' ? 'Immediate action recommended.' :
    level === 'high' ? 'Close monitoring and preparedness advised.' :
    level === 'moderate' ? 'Standard monitoring protocols apply.' :
    'Conditions are within safe parameters.'
  }`;

  const prob = +(normalized * 100).toFixed(1);
  const probabilities: Record<RiskLevel, number> = {
    low: level === 'low' ? prob : +(Math.random() * 15).toFixed(1),
    moderate: level === 'moderate' ? prob : +(10 + Math.random() * 20).toFixed(1),
    high: level === 'high' ? prob : +(5 + Math.random() * 15).toFixed(1),
    critical: level === 'critical' ? prob : +(Math.random() * 10).toFixed(1),
  };
  probabilities[level] = prob;

  return { level, probability: prob, explanation, probabilities };
}

export const riskColors: Record<RiskLevel, string> = {
  low: 'hsl(142, 70%, 42%)',
  moderate: 'hsl(45, 93%, 47%)',
  high: 'hsl(25, 95%, 53%)',
  critical: 'hsl(0, 72%, 51%)',
};

export const riskLabels: Record<RiskLevel, string> = {
  low: '🟢 Low Risk',
  moderate: '🟡 Moderate Risk',
  high: '🟠 High Risk',
  critical: '🔴 Critical Risk',
};
