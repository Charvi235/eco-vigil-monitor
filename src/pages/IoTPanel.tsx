// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import { sensors as initialSensors, jitterSensor } from '@/lib/mockData';
// import { Wifi, WifiOff, Battery, Clock, Plus, Radio } from 'lucide-react';
// import type { Sensor } from '@/lib/types';

// export default function IoTPanel() {
//   const [sensorList, setSensorList] = useState<Sensor[]>(initialSensors);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSensorList(prev => prev.map(s => (s.online ? jitterSensor(s) : s)));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const onlineCount = sensorList.filter(s => s.online).length;

//   return (
//     <div className="p-6 space-y-6 max-w-7xl">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">IoT Sensor Network</h1>
//           <p className="text-sm text-muted-foreground">{onlineCount}/{sensorList.length} sensors online</p>
//         </div>
//         <Button size="sm">
//           <Plus className="w-4 h-4 mr-1" /> Add Sensor
//         </Button>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {sensorList.map(sensor => (
//           <Card key={sensor.id} className={!sensor.online ? 'opacity-60' : ''}>
//             <CardHeader className="pb-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Radio className="w-4 h-4 text-primary" />
//                   <CardTitle className="text-sm font-semibold">{sensor.name}</CardTitle>
//                 </div>
//                 <Badge variant={sensor.online ? 'default' : 'secondary'} className="text-xs">
//                   {sensor.online ? (
//                     <><Wifi className="w-3 h-3 mr-1" /> Online</>
//                   ) : (
//                     <><WifiOff className="w-3 h-3 mr-1" /> Offline</>
//                   )}
//                 </Badge>
//               </div>
//               <p className="text-xs text-muted-foreground">{sensor.region}</p>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <div className="grid grid-cols-2 gap-2 text-xs">
//                 <span className="text-muted-foreground">Vegetation</span>
//                 <span className="font-medium text-foreground">{sensor.vegetationType}</span>
//                 <span className="text-muted-foreground">Coordinates</span>
//                 <span className="font-medium text-foreground">{sensor.lat.toFixed(2)}, {sensor.lng.toFixed(2)}</span>
//               </div>

//               <div className="space-y-1.5">
//                 <div className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-1 text-muted-foreground">
//                     <Battery className="w-3 h-3" /> Battery
//                   </span>
//                   <span className={`font-medium ${sensor.battery < 20 ? 'text-destructive' : sensor.battery < 50 ? 'text-risk-moderate' : 'text-primary'}`}>
//                     {sensor.battery}%
//                   </span>
//                 </div>
//                 <Progress value={sensor.battery} className="h-1.5" />
//               </div>

//               <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                 <Clock className="w-3 h-3" />
//                 Last updated: {sensor.lastUpdated.toLocaleTimeString()}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Battery, Clock, Plus, Radio, Server } from 'lucide-react';

import { sensors as initialSensors, jitterSensor } from '@/lib/mockData';
import type { Sensor } from '@/lib/types';

// --- CUSTOM STYLED COMPONENTS ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#0a120e]/60 backdrop-blur-md border border-white/5 rounded-xl shadow-xl ${className}`}>
    {children}
  </div>
);

export default function IoTPanel() {
  // Existing Logic (Preserved)
  const [sensorList, setSensorList] = useState<Sensor[]>(initialSensors);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorList(prev => prev.map(s => (s.online ? jitterSensor(s) : s)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onlineCount = sensorList.filter(s => s.online).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <Server className="text-emerald-500" /> IoT Device Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            <span className="text-emerald-400 font-bold">{onlineCount}</span> / {sensorList.length} sensors actively transmitting data
          </p>
        </div>
        
        {/* Styled Custom Action Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg border border-emerald-500/30 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)] w-fit">
          <Plus className="w-4 h-4" /> Deploy New Sensor
        </button>
      </div>

      {/* SENSOR GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorList.map(sensor => {
          // Dynamic Colors for Battery
          const isLowBattery = sensor.battery < 20;
          const isMediumBattery = sensor.battery < 50;
          const batteryColorClass = isLowBattery ? 'text-red-400' : isMediumBattery ? 'text-orange-400' : 'text-emerald-400';
          const batteryBgClass = isLowBattery ? 'bg-red-500' : isMediumBattery ? 'bg-orange-500' : 'bg-emerald-500';

          return (
            <GlassCard 
              key={sensor.id} 
              className={`p-5 flex flex-col gap-4 ${
                !sensor.online ? 'opacity-50 grayscale-[40%]' : 'hover:border-white/10 hover:bg-[#0f1a14]/80 transition-colors'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between border-b border-white/5 pb-3">
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Radio className={`w-4 h-4 shrink-0 ${sensor.online ? 'text-emerald-400' : 'text-gray-500'}`} />
                    <h3 className="font-bold text-sm text-gray-100 truncate">{sensor.name}</h3>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">{sensor.region}</p>
                </div>
                
                {/* Status Badge */}
                <div 
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border shrink-0 ${
                    sensor.online 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {sensor.online ? (
                    <><Wifi className="w-3 h-3" /> Online</>
                  ) : (
                    <><WifiOff className="w-3 h-3" /> Offline</>
                  )}
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/[0.02] p-2 rounded-lg border border-white/[0.05]">
                  <span className="block text-gray-500 mb-0.5 text-[10px] uppercase tracking-wider font-semibold">Vegetation</span>
                  <span className="font-medium text-gray-200">{sensor.vegetationType}</span>
                </div>
                <div className="bg-white/[0.02] p-2 rounded-lg border border-white/[0.05]">
                  <span className="block text-gray-500 mb-0.5 text-[10px] uppercase tracking-wider font-semibold">Coordinates</span>
                  <span className="font-medium text-gray-200">{sensor.lat.toFixed(2)}, {sensor.lng.toFixed(2)}</span>
                </div>
              </div>

              {/* Battery Indicator (Custom Progress Bar) */}
              <div className="space-y-2 mt-auto pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-400 font-medium">
                    <Battery className="w-3.5 h-3.5" /> Power Level
                  </span>
                  <span className={`font-bold ${batteryColorClass}`}>
                    {sensor.battery}%
                  </span>
                </div>
                
                {/* Progress Track */}
                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                  {/* Progress Fill */}
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${batteryBgClass} shadow-[0_0_10px_currentColor]`} 
                    style={{ width: `${sensor.battery}%` }} 
                  />
                </div>
              </div>

              {/* Footer Details */}
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-1 font-medium">
                <Clock className="w-3 h-3" />
                Last ping received: {sensor.lastUpdated.toLocaleTimeString()}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}