// import { useState, useEffect, useMemo } from 'react';
// import { Thermometer, Droplets, Wind, Gauge, CloudRain, Flame, Eye, Waves } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// import { sensors as initialSensors, generateTimeSeries, jitterSensor, alerts } from '@/lib/mockData';
// import { predictRisk } from '@/lib/fireRiskEngine';
// import RiskIndicator from '@/components/RiskIndicator';
// import SensorCard from '@/components/SensorCard';
// import type { Sensor } from '@/lib/types';

// export default function Dashboard() {
//   const [sensorList, setSensorList] = useState<Sensor[]>(initialSensors);
//   const [selectedId, setSelectedId] = useState(initialSensors[0].id);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSensorList(prev => prev.map(s => (s.online ? jitterSensor(s) : s)));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const sensor = sensorList.find(s => s.id === selectedId)!;
//   const prediction = useMemo(() => predictRisk(sensor), [sensor]);
//   const timeSeries = useMemo(() => generateTimeSeries(sensor), [sensor]);
//   const recentAlerts = alerts.filter(a => !a.acknowledged).slice(0, 3);

//   return (
//     <div className="p-6 space-y-6 max-w-7xl">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Live Monitoring Dashboard</h1>
//           <p className="text-sm text-muted-foreground">Real-time sensor data and AI fire risk prediction</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Badge variant="outline" className="border-primary/30 text-primary">
//             <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-1.5" />
//             Live
//           </Badge>
//           <Select value={selectedId} onValueChange={setSelectedId}>
//             <SelectTrigger className="w-56">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               {sensorList.map(s => (
//                 <SelectItem key={s.id} value={s.id}>
//                   {s.name} — {s.region}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Risk Indicator */}
//       <RiskIndicator level={prediction.level} probability={prediction.probability} explanation={prediction.explanation} />

//       {/* Sensor Cards Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         <SensorCard icon={Thermometer} label="Temperature" value={sensor.temperature} unit="°C" />
//         <SensorCard icon={Droplets} label="Humidity" value={sensor.humidity} unit="%" />
//         <SensorCard icon={Waves} label="Soil Moisture" value={sensor.soilMoisture} unit="%" />
//         <SensorCard icon={Wind} label="Wind Speed" value={sensor.windSpeed} unit="km/h" />
//         <SensorCard icon={Gauge} label="Pressure" value={sensor.pressure} unit="hPa" />
//         <SensorCard icon={CloudRain} label="Rainfall (24h)" value={sensor.rainfall} unit="mm" />
//         <SensorCard icon={Flame} label="CO₂ Level" value={sensor.co2} unit="ppm" />
//         <SensorCard icon={Eye} label="Smoke Index" value={sensor.smoke} unit="%" />
//       </div>

//       {/* Chart */}
//       <Card>
//         <CardHeader className="pb-2">
//           <CardTitle className="text-base font-semibold">24-Hour Trend — {sensor.name}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={timeSeries}>
//                 <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//                 <XAxis dataKey="time" tick={{ fontSize: 11 }} className="text-muted-foreground" />
//                 <YAxis tick={{ fontSize: 11 }} />
//                 <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
//                 <Legend />
//                 <Line type="monotone" dataKey="temperature" stroke="hsl(var(--chart-4))" name="Temp (°C)" strokeWidth={2} dot={false} />
//                 <Line type="monotone" dataKey="humidity" stroke="hsl(var(--chart-2))" name="Humidity (%)" strokeWidth={2} dot={false} />
//                 <Line type="monotone" dataKey="smoke" stroke="hsl(var(--chart-3))" name="Smoke (%)" strokeWidth={2} dot={false} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Recent Alerts */}
//       {recentAlerts.length > 0 && (
//         <Card className="border-risk-high/30">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-base font-semibold">⚠️ Active Alerts</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {recentAlerts.map(a => (
//               <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
//                 <RiskIndicator level={a.level} probability={0} explanation="" compact />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-foreground">{a.sensorName} — {a.region}</p>
//                   <p className="text-xs text-muted-foreground mt-0.5">{a.message}</p>
//                 </div>
//                 <span className="text-xs text-muted-foreground whitespace-nowrap">
//                   {a.timestamp.toLocaleTimeString()}
//                 </span>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from 'react';
import { 
  Thermometer, Droplets, Wind, Gauge, CloudRain, Flame, Eye, Waves, 
  MapPin, ArrowUpRight 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Tumhare existing imports (Logic same rahega)
import { sensors as initialSensors, generateTimeSeries, jitterSensor, alerts } from '@/lib/mockData';
import { predictRisk } from '@/lib/fireRiskEngine';
import type { Sensor } from '@/lib/types';

// --- CUSTOM STYLED COMPONENTS (New Look) ---

// 1. Dark Glass Card (Replaces Shadcn Card)
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#0a120e]/60 backdrop-blur-md border border-white/5 rounded-xl shadow-xl ${className}`}>
    {children}
  </div>
);

// 2. Neon Live Badge
const NeonBadge = ({ active }: { active: boolean }) => (
  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${active ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-gray-800/50 text-gray-400'}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`} />
    <span className="text-xs font-medium uppercase tracking-wider">Live</span>
  </div>
);

// 3. New Sensor Metric (Darker & Cleaner)
const SensorMetric = ({ icon: Icon, label, value, unit, trend }: any) => (
  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
    <div className="flex justify-between items-start mb-2">
      <div className="p-2 rounded-md bg-[#13201a] text-emerald-500/90">
        <Icon size={18} />
      </div>
      {trend && (
        <span className="text-xs text-emerald-500/60 flex items-center font-medium">
          <ArrowUpRight size={12} className="mr-0.5" /> {trend}
        </span>
      )}
    </div>
    <div className="text-gray-500 text-[11px] uppercase tracking-wider mb-1 font-semibold">{label}</div>
    <div className="text-2xl font-bold text-gray-100">
      {value} <span className="text-sm text-gray-600 font-medium ml-0.5">{unit}</span>
    </div>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---

export default function Dashboard() {
  const [sensorList, setSensorList] = useState<Sensor[]>(initialSensors);
  const [selectedId, setSelectedId] = useState(initialSensors[0].id);

  // Data Refresh Effect (Same as your old code)
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorList(prev => prev.map(s => (s.online ? jitterSensor(s) : s)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sensor = sensorList.find(s => s.id === selectedId) || sensorList[0];
  const prediction = useMemo(() => predictRisk(sensor), [sensor]);
  const timeSeries = useMemo(() => generateTimeSeries(sensor), [sensor]);
  const recentAlerts = alerts.filter(a => !a.acknowledged).slice(0, 3);

  // Dynamic Styles for Risk Banner
  const getRiskStyles = (level: string) => {
    switch(level) {
      case 'Critical': return 'bg-red-500/10 border-red-500/30 text-red-200';
      case 'High': return 'bg-orange-500/10 border-orange-500/30 text-orange-200';
      case 'Moderate': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200';
      default: return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Live Monitoring</h1>
          <div className="flex items-center text-gray-500 text-sm gap-2 mt-1">
            <MapPin size={14} />
            <span>Zone: {sensor.region}</span>
          </div>
        </div>
        
        {/* Custom styled Select instead of Shadcn Select for better blending */}
        <div className="flex items-center gap-3 bg-[#0a120e]/80 p-1 rounded-xl border border-white/5">
          <NeonBadge active={true} />
          <select 
            value={selectedId} 
            // onChange={(e) => setSelectedId(Number(e.target.value))}
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-transparent text-sm text-gray-300 focus:outline-none cursor-pointer [&>option]:text-black py-1 px-2"
          >
            {sensorList.map(s => (
              <option key={s.id} value={s.id}>{s.name} — {s.region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* RISK BANNER (Replaces RiskIndicator component) */}
      <div className={`relative overflow-hidden rounded-xl p-6 border ${getRiskStyles(prediction.level)} transition-all duration-500`}>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 opacity-80 font-bold tracking-wider text-xs uppercase mb-1">
              <Flame size={14} /> AI Analysis
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{prediction.level} Fire Risk</h2>
            <p className="opacity-80 max-w-xl text-sm leading-relaxed">
              {prediction.explanation}
            </p>
          </div>
          <div className="text-center px-6 py-2 rounded-lg bg-black/20 border border-white/5">
            <div className="text-3xl font-bold">{prediction.probability}%</div>
            <div className="opacity-60 text-[10px] font-bold uppercase tracking-wider">Probability</div>
          </div>
        </div>
      </div>

      {/* SENSOR GRID (Replaces SensorCard components) */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
          Live Readings
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SensorMetric icon={Thermometer} label="Temperature" value={sensor.temperature} unit="°C" trend="1.2%" />
          <SensorMetric icon={Droplets} label="Humidity" value={sensor.humidity} unit="%" trend="-0.5%" />
          <SensorMetric icon={Wind} label="Wind Speed" value={sensor.windSpeed} unit="km/h" />
          <SensorMetric icon={Flame} label="CO₂ Level" value={sensor.co2} unit="ppm" />
          <SensorMetric icon={Waves} label="Soil Moisture" value={sensor.soilMoisture} unit="%" />
          <SensorMetric icon={Gauge} label="Pressure" value={sensor.pressure} unit="hPa" />
          <SensorMetric icon={CloudRain} label="Rainfall" value={sensor.rainfall} unit="mm" />
          <SensorMetric icon={Eye} label="Smoke Index" value={sensor.smoke} unit="%" />
        </div>
      </GlassCard>

      {/* CHART & ALERTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART SECTION */}
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">24-Hour Trend</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0e1a15', borderColor: '#ffffff10', color: '#e5e7eb', borderRadius: '8px' }}
                  itemStyle={{ color: '#e5e7eb', fontSize: '12px' }}
                  cursor={{stroke: '#ffffff20', strokeWidth: 1}}
                />
                <Line type="monotone" dataKey="temperature" stroke="#f87171" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="humidity" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* RECENT ALERTS (Replaces Alerts Card) */}
        {recentAlerts.length > 0 && (
          <GlassCard className="p-6 border-orange-500/20">
            <h3 className="text-sm font-semibold text-orange-400/80 mb-4 uppercase tracking-wider flex items-center gap-2">
               Active Alerts
            </h3>
            <div className="space-y-3">
              {recentAlerts.map(a => (
                <div key={a.id} className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-orange-300">{a.sensorName}</span>
                    <span className="text-[10px] text-gray-500">{a.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-snug">{a.message}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>

    </div>
  );
}