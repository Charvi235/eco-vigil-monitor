import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SensorCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
}

export default function SensorCard({ icon: Icon, label, value, unit }: SensorCardProps) {
  return (
    <Card className="border-border/60">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-4.5 h-4.5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">{label}</p>
            <p className="text-lg font-bold text-foreground leading-tight">
              {value}<span className="text-xs font-normal text-muted-foreground ml-1">{unit}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
