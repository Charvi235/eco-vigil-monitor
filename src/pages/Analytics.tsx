import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { historicalRecords } from '@/lib/mockData';
import { riskColors } from '@/lib/fireRiskEngine';
import type { RiskLevel } from '@/lib/types';

export default function Analytics() {
  const riskDistribution = useMemo(() => {
    const counts: Record<RiskLevel, number> = { low: 0, moderate: 0, high: 0, critical: 0 };
    historicalRecords.forEach(r => counts[r.predictedRisk]++);
    return Object.entries(counts).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value, fill: riskColors[name as RiskLevel] }));
  }, []);

  const accuracyData = useMemo(() => {
    const fireCases = historicalRecords.filter(r => r.actualFire);
    const correctPredictions = fireCases.filter(r => r.predictedRisk === 'critical' || r.predictedRisk === 'high');
    const accuracy = fireCases.length > 0 ? ((correctPredictions.length / fireCases.length) * 100).toFixed(1) : 'N/A';
    return { total: historicalRecords.length, fires: fireCases.length, correct: correctPredictions.length, accuracy };
  }, []);

  const regionData = useMemo(() => {
    const regionMap = new Map<string, number>();
    historicalRecords.forEach(r => {
      if (r.predictedRisk === 'high' || r.predictedRisk === 'critical') {
        regionMap.set(r.region, (regionMap.get(r.region) || 0) + 1);
      }
    });
    return Array.from(regionMap.entries()).map(([region, count]) => ({ region: region.split(' ')[0], count }));
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Historical Analytics</h1>
        <p className="text-sm text-muted-foreground">Prediction history and model performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Predictions', value: accuracyData.total },
          { label: 'Fire Incidents', value: accuracyData.fires },
          { label: 'Correct Predictions', value: accuracyData.correct },
          { label: 'Model Accuracy', value: accuracyData.accuracy + '%' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Risk Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {riskDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">High-Risk Events by Region</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="region" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Prediction History</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-auto max-h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sensor</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Temp</TableHead>
                  <TableHead>Humidity</TableHead>
                  <TableHead>Wind</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Prob.</TableHead>
                  <TableHead>Fire?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalRecords.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="text-xs">{r.date.toLocaleDateString()}</TableCell>
                    <TableCell className="text-xs font-medium">{r.sensorName}</TableCell>
                    <TableCell className="text-xs">{r.region}</TableCell>
                    <TableCell className="text-xs">{r.temperature}°C</TableCell>
                    <TableCell className="text-xs">{r.humidity}%</TableCell>
                    <TableCell className="text-xs">{r.windSpeed} km/h</TableCell>
                    <TableCell>
                      <Badge style={{ backgroundColor: riskColors[r.predictedRisk] }} className="text-primary-foreground text-xs">
                        {r.predictedRisk}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{r.probability}%</TableCell>
                    <TableCell className="text-xs">{r.actualFire ? '🔥 Yes' : '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
