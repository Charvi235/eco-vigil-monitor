// import { useMemo } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
// import { historicalRecords } from '@/lib/mockData';
// import { riskColors } from '@/lib/fireRiskEngine';
// import type { RiskLevel } from '@/lib/types';

// export default function Analytics() {
//   const riskDistribution = useMemo(() => {
//     const counts: Record<RiskLevel, number> = { low: 0, moderate: 0, high: 0, critical: 0 };
//     historicalRecords.forEach(r => counts[r.predictedRisk]++);
//     return Object.entries(counts).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value, fill: riskColors[name as RiskLevel] }));
//   }, []);

//   const accuracyData = useMemo(() => {
//     const fireCases = historicalRecords.filter(r => r.actualFire);
//     const correctPredictions = fireCases.filter(r => r.predictedRisk === 'critical' || r.predictedRisk === 'high');
//     const accuracy = fireCases.length > 0 ? ((correctPredictions.length / fireCases.length) * 100).toFixed(1) : 'N/A';
//     return { total: historicalRecords.length, fires: fireCases.length, correct: correctPredictions.length, accuracy };
//   }, []);

//   const regionData = useMemo(() => {
//     const regionMap = new Map<string, number>();
//     historicalRecords.forEach(r => {
//       if (r.predictedRisk === 'high' || r.predictedRisk === 'critical') {
//         regionMap.set(r.region, (regionMap.get(r.region) || 0) + 1);
//       }
//     });
//     return Array.from(regionMap.entries()).map(([region, count]) => ({ region: region.split(' ')[0], count }));
//   }, []);

//   return (
//     <div className="p-6 space-y-6 max-w-7xl">
//       <div>
//         <h1 className="text-2xl font-bold text-foreground">Historical Analytics</h1>
//         <p className="text-sm text-muted-foreground">Prediction history and model performance</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {[
//           { label: 'Total Predictions', value: accuracyData.total },
//           { label: 'Fire Incidents', value: accuracyData.fires },
//           { label: 'Correct Predictions', value: accuracyData.correct },
//           { label: 'Model Accuracy', value: accuracyData.accuracy + '%' },
//         ].map(s => (
//           <Card key={s.label}>
//             <CardContent className="p-4 text-center">
//               <p className="text-2xl font-bold text-foreground">{s.value}</p>
//               <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Risk Distribution</CardTitle></CardHeader>
//           <CardContent>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie data={riskDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
//                     {riskDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">High-Risk Events by Region</CardTitle></CardHeader>
//           <CardContent>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={regionData}>
//                   <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//                   <XAxis dataKey="region" tick={{ fontSize: 11 }} />
//                   <YAxis tick={{ fontSize: 11 }} />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* History Table */}
//       <Card>
//         <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Prediction History</CardTitle></CardHeader>
//         <CardContent>
//           <div className="overflow-auto max-h-96">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Sensor</TableHead>
//                   <TableHead>Region</TableHead>
//                   <TableHead>Temp</TableHead>
//                   <TableHead>Humidity</TableHead>
//                   <TableHead>Wind</TableHead>
//                   <TableHead>Risk</TableHead>
//                   <TableHead>Prob.</TableHead>
//                   <TableHead>Fire?</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {historicalRecords.map(r => (
//                   <TableRow key={r.id}>
//                     <TableCell className="text-xs">{r.date.toLocaleDateString()}</TableCell>
//                     <TableCell className="text-xs font-medium">{r.sensorName}</TableCell>
//                     <TableCell className="text-xs">{r.region}</TableCell>
//                     <TableCell className="text-xs">{r.temperature}°C</TableCell>
//                     <TableCell className="text-xs">{r.humidity}%</TableCell>
//                     <TableCell className="text-xs">{r.windSpeed} km/h</TableCell>
//                     <TableCell>
//                       <Badge style={{ backgroundColor: riskColors[r.predictedRisk] }} className="text-primary-foreground text-xs">
//                         {r.predictedRisk}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-xs">{r.probability}%</TableCell>
//                     <TableCell className="text-xs">{r.actualFire ? '🔥 Yes' : '—'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Activity, Target, Flame, BarChart2 } from 'lucide-react';

import { historicalRecords } from '@/lib/mockData';
import { riskColors } from '@/lib/fireRiskEngine';
import type { RiskLevel } from '@/lib/types';

// --- CUSTOM STYLED COMPONENTS ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#0a120e]/60 backdrop-blur-md border border-white/5 rounded-xl shadow-xl ${className}`}>
    {children}
  </div>
);

export default function Analytics() {
  // --- EXISTING LOGIC (Untouched) ---
  const riskDistribution = useMemo(() => {
    const counts: Record<RiskLevel, number> = { low: 0, moderate: 0, high: 0, critical: 0 };
    historicalRecords.forEach(r => counts[r.predictedRisk]++);
    return Object.entries(counts).map(([name, value]) => ({ 
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      value, 
      fill: riskColors[name as RiskLevel] 
    }));
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

  // --- UI RENDER ---
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
          <BarChart2 className="text-emerald-500" /> Historical Analytics
        </h1>
        <p className="text-sm text-gray-500 mt-1">Prediction history and AI model performance metrics</p>
      </div>

      {/* STAT CARDS (Replaced Shadcn Cards with Dark Glass) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Predictions', value: accuracyData.total, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Fire Incidents', value: accuracyData.fires, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
          { label: 'Correct Predictions', value: accuracyData.correct, icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Model Accuracy', value: accuracyData.accuracy + '%', icon: BarChart2, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((s, i) => (
          <GlassCard key={i} className="p-4 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className={`absolute top-0 w-full h-1 ${s.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />
            <div className={`p-3 rounded-full ${s.bg} mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-3xl font-black text-gray-100 tracking-tight">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wider">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Pie Chart */}
        <GlassCard className="p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">Risk Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={riskDistribution} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={90} 
                  innerRadius={60} // Added inner radius for a modern donut look
                  stroke="#0a120e" // Matches background
                  strokeWidth={4}
                  label={{ fill: '#9ca3af', fontSize: 12 }}
                >
                  {riskDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0a120e', borderColor: '#ffffff10', color: '#e5e7eb', borderRadius: '8px' }}
                  itemStyle={{ color: '#e5e7eb' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Bar Chart */}
        <GlassCard className="p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">High-Risk Events by Region</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="region" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0a120e', borderColor: '#ffffff10', color: '#e5e7eb', borderRadius: '8px' }}
                  itemStyle={{ color: '#e5e7eb' }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* HISTORY TABLE (Custom Dark Theme Table) */}
      <GlassCard className="overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Prediction History</h3>
        </div>
        
        <div className="overflow-x-auto max-h-96 custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/40 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                {['Date', 'Sensor', 'Region', 'Temp', 'Humidity', 'Wind', 'Risk', 'Prob.', 'Fire?'].map((head, i) => (
                  <th key={i} className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {historicalRecords.map(r => {
                const markerColor = riskColors[r.predictedRisk] || '#10b981';
                
                return (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">{r.date.toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-xs font-bold text-gray-200">{r.sensorName}</td>
                    <td className="py-3 px-4 text-xs text-gray-400">{r.region}</td>
                    <td className="py-3 px-4 text-xs text-gray-300">{r.temperature}°C</td>
                    <td className="py-3 px-4 text-xs text-gray-300">{r.humidity}%</td>
                    <td className="py-3 px-4 text-xs text-gray-300">{r.windSpeed} km/h</td>
                    <td className="py-3 px-4 text-xs">
                      <span 
                        className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border"
                        style={{ 
                          backgroundColor: `${markerColor}15`, 
                          color: markerColor,
                          borderColor: `${markerColor}30`
                        }}
                      >
                        {r.predictedRisk}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-gray-300">{r.probability}%</td>
                    <td className="py-3 px-4 text-xs">
                      {r.actualFire ? (
                        <span className="text-orange-400 font-bold bg-orange-400/10 px-2 py-1 rounded-md flex items-center gap-1 w-max">
                          <Flame size={12} /> Yes
                        </span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

    </div>
  );
}