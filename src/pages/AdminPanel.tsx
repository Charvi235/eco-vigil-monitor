import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { sensors } from '@/lib/mockData';
import { historicalRecords } from '@/lib/mockData';
import { Shield, RefreshCw, Trash2, Activity, Target, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPanel() {
  const { toast } = useToast();
  const [retraining, setRetraining] = useState(false);

  const modelMetrics = useMemo(() => ({
    accuracy: 87.3,
    precision: 91.2,
    recall: 83.8,
    f1Score: 87.4,
    totalPredictions: historicalRecords.length,
    lastTrained: '2026-02-17 14:30 IST',
  }), []);

  const handleRetrain = () => {
    setRetraining(true);
    setTimeout(() => {
      setRetraining(false);
      toast({ title: 'Model Retrained', description: 'Fire risk prediction model has been updated successfully.' });
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">System management and model controls</p>
        </div>
      </div>

      {/* Model Performance */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4" /> Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Accuracy', value: modelMetrics.accuracy, icon: Target },
                { label: 'Precision', value: modelMetrics.precision, icon: TrendingUp },
                { label: 'Recall', value: modelMetrics.recall, icon: Activity },
                { label: 'F1 Score', value: modelMetrics.f1Score, icon: Target },
              ].map(m => (
                <div key={m.label} className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{m.value}%</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Last trained: {modelMetrics.lastTrained}</span>
              <Button size="sm" onClick={handleRetrain} disabled={retraining}>
                <RefreshCw className={`w-3.5 h-3.5 mr-1 ${retraining ? 'animate-spin' : ''}`} />
                {retraining ? 'Retraining...' : 'Retrain Model'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">System Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Total Sensors', value: sensors.length },
              { label: 'Online Sensors', value: sensors.filter(s => s.online).length },
              { label: 'Total Predictions', value: modelMetrics.totalPredictions },
              { label: 'Active Regions', value: new Set(sensors.map(s => s.region)).size },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <span className="text-sm font-semibold text-foreground">{s.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sensor Management */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Sensor Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sensors.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="text-xs font-mono">{s.id}</TableCell>
                  <TableCell className="text-sm font-medium">{s.name}</TableCell>
                  <TableCell className="text-xs">{s.region}</TableCell>
                  <TableCell>
                    <Badge variant={s.online ? 'default' : 'secondary'} className="text-xs">
                      {s.online ? 'Online' : 'Offline'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">{s.battery}%</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Sensor removed', description: `${s.name} has been removed from the network.` })}>
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
