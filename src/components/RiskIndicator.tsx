import { RiskLevel } from '@/lib/types';
import { riskLabels } from '@/lib/fireRiskEngine';

const riskBgClasses: Record<RiskLevel, string> = {
  low: 'bg-risk-low risk-glow-low',
  moderate: 'bg-risk-moderate risk-glow-moderate',
  high: 'bg-risk-high risk-glow-high',
  critical: 'bg-risk-critical risk-glow-critical',
};

interface RiskIndicatorProps {
  level: RiskLevel;
  probability: number;
  explanation: string;
  compact?: boolean;
}

export default function RiskIndicator({ level, probability, explanation, compact }: RiskIndicatorProps) {
  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-primary-foreground ${riskBgClasses[level]}`}>
        {riskLabels[level]}
      </span>
    );
  }

  return (
    <div className={`rounded-xl p-6 text-primary-foreground ${riskBgClasses[level]}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">{riskLabels[level]}</h3>
        <span className="text-3xl font-black">{probability}%</span>
      </div>
      <p className="text-sm opacity-90 leading-relaxed">{explanation}</p>
    </div>
  );
}
