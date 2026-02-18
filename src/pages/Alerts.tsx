import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { alerts as initialAlerts } from '@/lib/mockData';
import { riskColors } from '@/lib/fireRiskEngine';
import { Bell, Mail, MessageSquare, Check } from 'lucide-react';
import type { Alert, RiskLevel } from '@/lib/types';

const levelOrder: Record<RiskLevel, number> = { critical: 0, high: 1, moderate: 2, low: 3 };

export default function Alerts() {
  const [alertList, setAlertList] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<RiskLevel | 'all'>('all');

  const filtered = alertList
    .filter(a => filter === 'all' || a.level === filter)
    .sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);

  const acknowledge = (id: string) => {
    setAlertList(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const activeCount = alertList.filter(a => !a.acknowledged).length;

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alert System</h1>
          <p className="text-sm text-muted-foreground">{activeCount} active alert{activeCount !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'critical', 'high', 'moderate', 'low'] as const).map(level => (
            <Button
              key={level}
              variant={filter === level ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(level)}
            >
              {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(alert => (
          <Card key={alert.id} className={`border-l-4 ${alert.acknowledged ? 'opacity-60' : ''}`} style={{ borderLeftColor: riskColors[alert.level] }}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: riskColors[alert.level] + '22' }}>
                  <Bell className="w-4 h-4" style={{ color: riskColors[alert.level] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">{alert.sensorName}</span>
                    <Badge variant="outline" className="text-xs">{alert.region}</Badge>
                    <Badge style={{ backgroundColor: riskColors[alert.level] }} className="text-primary-foreground text-xs">
                      {alert.level.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-muted-foreground">{alert.timestamp.toLocaleString()}</span>
                    <div className="flex gap-2">
                      {alert.emailSent && (
                        <span className="flex items-center gap-1 text-xs text-primary">
                          <Mail className="w-3 h-3" /> Email sent
                        </span>
                      )}
                      {alert.smsSent && (
                        <span className="flex items-center gap-1 text-xs text-primary">
                          <MessageSquare className="w-3 h-3" /> SMS sent
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {!alert.acknowledged && (
                  <Button variant="outline" size="sm" onClick={() => acknowledge(alert.id)}>
                    <Check className="w-3.5 h-3.5 mr-1" /> Acknowledge
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
