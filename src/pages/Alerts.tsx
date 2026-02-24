// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { alerts as initialAlerts } from '@/lib/mockData';
// import { riskColors } from '@/lib/fireRiskEngine';
// import { Bell, Mail, MessageSquare, Check } from 'lucide-react';
// import type { Alert, RiskLevel } from '@/lib/types';

// const levelOrder: Record<RiskLevel, number> = { critical: 0, high: 1, moderate: 2, low: 3 };

// export default function Alerts() {
//   const [alertList, setAlertList] = useState<Alert[]>(initialAlerts);
//   const [filter, setFilter] = useState<RiskLevel | 'all'>('all');

//   const filtered = alertList
//     .filter(a => filter === 'all' || a.level === filter)
//     .sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);

//   const acknowledge = (id: string) => {
//     setAlertList(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
//   };

//   const activeCount = alertList.filter(a => !a.acknowledged).length;

//   return (
//     <div className="p-6 space-y-6 max-w-5xl">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Alert System</h1>
//           <p className="text-sm text-muted-foreground">{activeCount} active alert{activeCount !== 1 ? 's' : ''}</p>
//         </div>
//         <div className="flex gap-2">
//           {(['all', 'critical', 'high', 'moderate', 'low'] as const).map(level => (
//             <Button
//               key={level}
//               variant={filter === level ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setFilter(level)}
//             >
//               {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
//             </Button>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-3">
//         {filtered.map(alert => (
//           <Card key={alert.id} className={`border-l-4 ${alert.acknowledged ? 'opacity-60' : ''}`} style={{ borderLeftColor: riskColors[alert.level] }}>
//             <CardContent className="p-4">
//               <div className="flex items-start gap-4">
//                 <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: riskColors[alert.level] + '22' }}>
//                   <Bell className="w-4 h-4" style={{ color: riskColors[alert.level] }} />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="font-semibold text-sm text-foreground">{alert.sensorName}</span>
//                     <Badge variant="outline" className="text-xs">{alert.region}</Badge>
//                     <Badge style={{ backgroundColor: riskColors[alert.level] }} className="text-primary-foreground text-xs">
//                       {alert.level.toUpperCase()}
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground">{alert.message}</p>
//                   <div className="flex items-center gap-4 mt-2">
//                     <span className="text-xs text-muted-foreground">{alert.timestamp.toLocaleString()}</span>
//                     <div className="flex gap-2">
//                       {alert.emailSent && (
//                         <span className="flex items-center gap-1 text-xs text-primary">
//                           <Mail className="w-3 h-3" /> Email sent
//                         </span>
//                       )}
//                       {alert.smsSent && (
//                         <span className="flex items-center gap-1 text-xs text-primary">
//                           <MessageSquare className="w-3 h-3" /> SMS sent
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 {!alert.acknowledged && (
//                   <Button variant="outline" size="sm" onClick={() => acknowledge(alert.id)}>
//                     <Check className="w-3.5 h-3.5 mr-1" /> Acknowledge
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { alerts as initialAlerts } from '@/lib/mockData';
import { riskColors } from '@/lib/fireRiskEngine';
import { Bell, Mail, MessageSquare, Check, AlertTriangle } from 'lucide-react';
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
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <AlertTriangle className="text-emerald-500" /> Alert System
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeCount} active alert{activeCount !== 1 ? 's' : ''} requiring attention
          </p>
        </div>
        
        {/* Filter Buttons (Dark Glass Style) */}
        <div className="flex flex-wrap gap-2 bg-[#0a120e]/80 p-1.5 rounded-xl border border-white/5 backdrop-blur-md">
          {(['all', 'critical', 'high', 'moderate', 'low'] as const).map(level => {
            const isActive = filter === level;
            return (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                {level === 'all' ? 'All Alerts' : level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ALERT LIST */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-[#0a120e]/40 backdrop-blur-md border border-white/5 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-emerald-500/50" />
            </div>
            <p className="text-gray-400 font-medium">No alerts matching this filter.</p>
          </div>
        ) : (
          filtered.map(alert => {
            const markerColor = riskColors[alert.level] || '#10b981';
            
            return (
              <div 
                key={alert.id} 
                className={`relative p-5 rounded-xl bg-[#0a120e]/60 backdrop-blur-md border border-white/5 transition-all overflow-hidden flex flex-col sm:flex-row gap-4 sm:items-start group ${
                  alert.acknowledged ? 'opacity-50 grayscale-[30%]' : 'hover:bg-[#0f1a14]/80 hover:border-white/10'
                }`}
              >
                {/* Accent Line */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 transition-all ${alert.acknowledged ? 'w-1' : 'w-1.5'}`} 
                  style={{ backgroundColor: markerColor }} 
                />

                {/* Icon Circle */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/5"
                  style={{ backgroundColor: `${markerColor}15` }}
                >
                  <Bell className="w-4 h-4" style={{ color: markerColor }} />
                </div>

                {/* Alert Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <span className="font-bold text-sm text-gray-100">{alert.sensorName}</span>
                    
                    <span className="px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-semibold border border-white/10 bg-white/5 text-gray-400">
                      {alert.region}
                    </span>
                    
                    <span 
                      className="px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-bold border"
                      style={{ 
                        backgroundColor: `${markerColor}15`, 
                        color: markerColor,
                        borderColor: `${markerColor}30`
                      }}
                    >
                      {alert.level} RISK
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">{alert.message}</p>
                  
                  {/* Meta Info (Time & Comms) */}
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <span className="text-gray-500 font-medium">
                      {alert.timestamp.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    
                    <div className="flex items-center gap-3">
                      {alert.emailSent && (
                        <span className="flex items-center gap-1.5 text-emerald-400/80 bg-emerald-400/10 px-2 py-1 rounded-md">
                          <Mail className="w-3 h-3" /> Email Dispatched
                        </span>
                      )}
                      {alert.smsSent && (
                        <span className="flex items-center gap-1.5 text-blue-400/80 bg-blue-400/10 px-2 py-1 rounded-md">
                          <MessageSquare className="w-3 h-3" /> SMS Sent
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {!alert.acknowledged ? (
                  <button 
                    onClick={() => acknowledge(alert.id)}
                    className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white/[0.03] hover:bg-emerald-500/20 text-gray-300 hover:text-emerald-400 text-sm font-medium rounded-lg border border-white/10 hover:border-emerald-500/30 transition-all"
                  >
                    <Check className="w-4 h-4" /> Acknowledge
                  </button>
                ) : (
                  <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-gray-500 text-xs font-bold uppercase tracking-wider">
                    <Check className="w-4 h-4" /> Resolved
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}