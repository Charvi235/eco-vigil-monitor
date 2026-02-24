// import { useMemo } from 'react';
// import { sensors } from '@/lib/mockData';
// import { predictRisk, riskColors, riskLabels } from '@/lib/fireRiskEngine';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { MapPin } from 'lucide-react';
// import RiskIndicator from '@/components/RiskIndicator';

// export default function MapView() {
//   const sensorRisks = useMemo(() =>
//     sensors.map(s => ({ sensor: s, prediction: predictRisk(s) })),
//     []
//   );

//   return (
//     <div className="p-6 space-y-4 max-w-7xl">
//       <div>
//         <h1 className="text-2xl font-bold text-foreground">Map View</h1>
//         <p className="text-sm text-muted-foreground">Sensor locations with real-time risk assessment across India</p>
//       </div>

//       {/* Visual Map Representation */}
//       <Card>
//         <CardContent className="p-0">
//           <div className="relative h-[500px] bg-secondary/30 overflow-hidden rounded-lg">
//             {/* India outline background */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-[200px] opacity-5 select-none">🗺️</div>
//             </div>
//             {/* Sensor markers positioned roughly on India map */}
//             {sensorRisks.map(({ sensor, prediction }) => {
//               // Normalize lat/lng to percentage positions within India bounds
//               const latRange = { min: 8, max: 35 };
//               const lngRange = { min: 68, max: 97 };
//               const top = ((latRange.max - sensor.lat) / (latRange.max - latRange.min)) * 80 + 5;
//               const left = ((sensor.lng - lngRange.min) / (lngRange.max - lngRange.min)) * 80 + 10;

//               return (
//                 <div
//                   key={sensor.id}
//                   className="absolute group cursor-pointer"
//                   style={{ top: `${top}%`, left: `${left}%`, transform: 'translate(-50%, -50%)' }}
//                 >
//                   {/* Pulse ring for critical/high */}
//                   {(prediction.level === 'critical' || prediction.level === 'high') && (
//                     <div
//                       className="absolute inset-0 rounded-full animate-ping opacity-30"
//                       style={{ backgroundColor: riskColors[prediction.level], width: 32, height: 32, margin: -4 }}
//                     />
//                   )}
//                   {/* Marker dot */}
//                   <div
//                     className="w-6 h-6 rounded-full border-2 border-card flex items-center justify-center shadow-lg relative z-10"
//                     style={{ backgroundColor: riskColors[prediction.level] }}
//                   >
//                     <MapPin className="w-3 h-3 text-primary-foreground" />
//                   </div>
//                   {/* Tooltip on hover */}
//                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 w-64">
//                     <Card className="shadow-xl">
//                       <CardContent className="p-3 space-y-2">
//                         <h4 className="font-bold text-sm text-foreground">{sensor.name}</h4>
//                         <p className="text-xs text-muted-foreground">{sensor.region}</p>
//                         <div className="grid grid-cols-2 gap-1 text-xs">
//                           <span>🌡 {sensor.temperature}°C</span>
//                           <span>💧 {sensor.humidity}%</span>
//                           <span>💨 {sensor.windSpeed} km/h</span>
//                           <span>🔥 Smoke: {sensor.smoke}%</span>
//                           <span>🏭 CO₂: {sensor.co2} ppm</span>
//                           <span>🌧 Rain: {sensor.rainfall} mm</span>
//                         </div>
//                         <RiskIndicator level={prediction.level} probability={prediction.probability} explanation={prediction.explanation} compact />
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Sensor List */}
//       <div className="grid md:grid-cols-2 gap-4">
//         {sensorRisks.map(({ sensor, prediction }) => (
//           <Card key={sensor.id} className="border-l-4" style={{ borderLeftColor: riskColors[prediction.level] }}>
//             <CardContent className="p-4 flex items-center gap-4">
//               <div
//                 className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
//                 style={{ backgroundColor: riskColors[prediction.level] + '22' }}
//               >
//                 <MapPin className="w-5 h-5" style={{ color: riskColors[prediction.level] }} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="font-semibold text-sm text-foreground">{sensor.name}</p>
//                 <p className="text-xs text-muted-foreground">{sensor.region} · {sensor.lat.toFixed(2)}°N, {sensor.lng.toFixed(2)}°E</p>
//               </div>
//               <Badge style={{ backgroundColor: riskColors[prediction.level] }} className="text-primary-foreground text-xs">
//                 {prediction.level.toUpperCase()} {prediction.probability}%
//               </Badge>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useMemo } from 'react';
import { MapPin, Wind, Droplets, Thermometer, Flame, CloudRain, Eye } from 'lucide-react';
import { sensors } from '@/lib/mockData';
import { predictRisk, riskColors } from '@/lib/fireRiskEngine';
// RiskIndicator ko hum use karenge, par agar wo light theme me hua to humne tooltip custom banaya hai
import RiskIndicator from '@/components/RiskIndicator'; 

// --- CUSTOM STYLED COMPONENTS ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#0a120e]/60 backdrop-blur-md border border-white/5 rounded-xl shadow-xl ${className}`}>
    {children}
  </div>
);

export default function MapView() {
  const sensorRisks = useMemo(() =>
    sensors.map(s => ({ sensor: s, prediction: predictRisk(s) })),
    []
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Live Map Tracking</h1>
        <p className="text-sm text-gray-500 mt-1">Geospatial sensor positioning and real-time risk assessment</p>
      </div>

      {/* VISUAL MAP AREA (Tech Radar Style) */}
      <GlassCard className="p-1 overflow-hidden">
        {/* Map Container */}
        <div className="relative h-[500px] bg-[#050a07]/80 rounded-lg overflow-hidden">
          
          {/* Tech Grid Background (Radar feel) */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', 
              backgroundSize: '30px 30px' 
            }} 
          />
          
          {/* India outline placeholder (Dim & Abstract) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-[300px] opacity-[0.02] select-none grayscale blur-[2px]">🗺️</div>
          </div>

          {/* SENSOR MARKERS */}
          {sensorRisks.map(({ sensor, prediction }) => {
            const latRange = { min: 8, max: 35 };
            const lngRange = { min: 68, max: 97 };
            const top = ((latRange.max - sensor.lat) / (latRange.max - latRange.min)) * 80 + 5;
            const left = ((sensor.lng - lngRange.min) / (lngRange.max - lngRange.min)) * 80 + 10;
            
            // Marker color fallback
            const markerColor = riskColors[prediction.level as keyof typeof riskColors] || '#10b981';

            return (
              <div
                key={sensor.id}
                className="absolute group cursor-pointer z-10"
                style={{ top: `${top}%`, left: `${left}%`, transform: 'translate(-50%, -50%)' }}
              >
                {/* Pulse ring for critical/high */}
                {(prediction.level === 'critical' || prediction.level === 'high') && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-40"
                    style={{ backgroundColor: markerColor, width: 36, height: 36, margin: -6 }}
                  />
                )}
                
                {/* Marker Dot */}
                <div
                  className="w-6 h-6 rounded-full border-2 border-[#050a07] flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] relative z-10 transition-transform group-hover:scale-125"
                  style={{ backgroundColor: markerColor }}
                >
                  <MapPin className="w-3 h-3 text-white" />
                </div>

                {/* HOVER TOOLTIP (Dark Glass Style) */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-50 w-72 pointer-events-none">
                  <div className="bg-[#0a1410]/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl">
                    <div className="border-b border-white/5 pb-2 mb-3">
                      <h4 className="font-bold text-sm text-gray-100">{sensor.name}</h4>
                      <p className="text-[11px] text-gray-500">{sensor.region}</p>
                    </div>
                    
                    {/* Tooltip Grid */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11px] text-gray-300 font-medium mb-3">
                      <div className="flex items-center gap-1.5"><Thermometer size={12} className="text-red-400"/> {sensor.temperature}°C</div>
                      <div className="flex items-center gap-1.5"><Droplets size={12} className="text-blue-400"/> {sensor.humidity}%</div>
                      <div className="flex items-center gap-1.5"><Wind size={12} className="text-gray-400"/> {sensor.windSpeed} km/h</div>
                      <div className="flex items-center gap-1.5"><Eye size={12} className="text-purple-400"/> {sensor.smoke}% Smk</div>
                    </div>

                    {/* Miniature Risk Badge */}
                    <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                      <span className="text-xs font-bold uppercase tracking-wide" style={{ color: markerColor }}>
                        {prediction.level} RISK
                      </span>
                      <span className="text-xs font-black text-white">{prediction.probability}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* SENSOR LIST CARDS */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Active Deployments</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sensorRisks.map(({ sensor, prediction }) => {
            const markerColor = riskColors[prediction.level as keyof typeof riskColors] || '#10b981';
            
            return (
              <div 
                key={sensor.id} 
                className="relative p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all overflow-hidden flex items-center gap-4 group"
              >
                {/* Left colored accent line */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1 transition-all group-hover:w-1.5" 
                  style={{ backgroundColor: markerColor }} 
                />
                
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-white/5 bg-[#0a120e]"
                >
                  <MapPin className="w-4 h-4" style={{ color: markerColor }} />
                </div>
                
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-100 truncate">{sensor.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{sensor.region}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{sensor.lat.toFixed(2)}°N, {sensor.lng.toFixed(2)}°E</p>
                </div>
                
                {/* Status Badge */}
                <div 
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border"
                  style={{ 
                    backgroundColor: `${markerColor}15`, 
                    color: markerColor,
                    borderColor: `${markerColor}30`
                  }}
                >
                  {prediction.probability}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
