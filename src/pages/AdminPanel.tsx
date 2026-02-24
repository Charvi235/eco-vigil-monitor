// import { useState, useMemo } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { sensors } from '@/lib/mockData';
// import { historicalRecords } from '@/lib/mockData';
// import { Shield, RefreshCw, Trash2, Activity, Target, TrendingUp } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// export default function AdminPanel() {
//   const { toast } = useToast();
//   const [retraining, setRetraining] = useState(false);

//   const modelMetrics = useMemo(() => ({
//     accuracy: 87.3,
//     precision: 91.2,
//     recall: 83.8,
//     f1Score: 87.4,
//     totalPredictions: historicalRecords.length,
//     lastTrained: '2026-02-17 14:30 IST',
//   }), []);

//   const handleRetrain = () => {
//     setRetraining(true);
//     setTimeout(() => {
//       setRetraining(false);
//       toast({ title: 'Model Retrained', description: 'Fire risk prediction model has been updated successfully.' });
//     }, 3000);
//   };

//   return (
//     <div className="p-6 space-y-6 max-w-7xl">
//       <div className="flex items-center gap-3">
//         <Shield className="w-6 h-6 text-primary" />
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
//           <p className="text-sm text-muted-foreground">System management and model controls</p>
//         </div>
//       </div>

//       {/* Model Performance */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-semibold flex items-center gap-2">
//               <Activity className="w-4 h-4" /> Model Performance
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { label: 'Accuracy', value: modelMetrics.accuracy, icon: Target },
//                 { label: 'Precision', value: modelMetrics.precision, icon: TrendingUp },
//                 { label: 'Recall', value: modelMetrics.recall, icon: Activity },
//                 { label: 'F1 Score', value: modelMetrics.f1Score, icon: Target },
//               ].map(m => (
//                 <div key={m.label} className="text-center p-3 rounded-lg bg-muted/50">
//                   <p className="text-2xl font-bold text-foreground">{m.value}%</p>
//                   <p className="text-xs text-muted-foreground">{m.label}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
//               <span>Last trained: {modelMetrics.lastTrained}</span>
//               <Button size="sm" onClick={handleRetrain} disabled={retraining}>
//                 <RefreshCw className={`w-3.5 h-3.5 mr-1 ${retraining ? 'animate-spin' : ''}`} />
//                 {retraining ? 'Retraining...' : 'Retrain Model'}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-semibold">System Stats</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             {[
//               { label: 'Total Sensors', value: sensors.length },
//               { label: 'Online Sensors', value: sensors.filter(s => s.online).length },
//               { label: 'Total Predictions', value: modelMetrics.totalPredictions },
//               { label: 'Active Regions', value: new Set(sensors.map(s => s.region)).size },
//             ].map(s => (
//               <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
//                 <span className="text-sm text-muted-foreground">{s.label}</span>
//                 <span className="text-sm font-semibold text-foreground">{s.value}</span>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Sensor Management */}
//       <Card>
//         <CardHeader className="pb-3">
//           <CardTitle className="text-sm font-semibold">Sensor Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>ID</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Region</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Battery</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {sensors.map(s => (
//                 <TableRow key={s.id}>
//                   <TableCell className="text-xs font-mono">{s.id}</TableCell>
//                   <TableCell className="text-sm font-medium">{s.name}</TableCell>
//                   <TableCell className="text-xs">{s.region}</TableCell>
//                   <TableCell>
//                     <Badge variant={s.online ? 'default' : 'secondary'} className="text-xs">
//                       {s.online ? 'Online' : 'Offline'}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-xs">{s.battery}%</TableCell>
//                   <TableCell>
//                     <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Sensor removed', description: `${s.name} has been removed from the network.` })}>
//                       <Trash2 className="w-3.5 h-3.5 text-destructive" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



import React, { useState, useMemo } from 'react';
//import { Shield, RefreshCw, Trash2, Activity, Target, TrendingUp, Cpu, Server, Wifi, Battery } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sensors, historicalRecords } from '@/lib/mockData';
// import { Shield, RefreshCw, Trash2, Activity, Target, TrendingUp, Cpu, Server, Wifi, WifiOff, Battery } from 'lucide-react';
import { Shield, RefreshCw, Trash2, Activity, Target, TrendingUp, Cpu, Server, Wifi, WifiOff, Battery, Radio } from 'lucide-react';

// --- CUSTOM STYLED COMPONENTS ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#0a120e]/60 backdrop-blur-md border border-white/5 rounded-xl shadow-xl ${className}`}>
    {children}
  </div>
);

export default function AdminPanel() {
  const { toast } = useToast();
  const [retraining, setRetraining] = useState(false);

  // Data Logic (Untouched)
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

  const onlineSensorsCount = sensors.filter(s => s.online).length;
  const activeRegionsCount = new Set(sensors.map(s => s.region)).size;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl">
      
      {/* HEADER SECTION */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Shield className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-100">System Administration</h1>
          <p className="text-sm text-gray-500">Core system management and AI model controls</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* MODEL PERFORMANCE CARD */}
        <GlassCard className="p-6 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-500" /> AI Model Diagnostics
            </h2>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" /> Live Status: Operational
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Accuracy', value: modelMetrics.accuracy, icon: Target, color: 'text-emerald-400' },
              { label: 'Precision', value: modelMetrics.precision, icon: TrendingUp, color: 'text-blue-400' },
              { label: 'Recall', value: modelMetrics.recall, icon: Activity, color: 'text-orange-400' },
              { label: 'F1 Score', value: modelMetrics.f1Score, icon: Target, color: 'text-purple-400' },
            ].map(m => (
              <div key={m.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center justify-center text-center group hover:bg-white/[0.04] transition-colors">
                <m.icon className={`w-5 h-5 mb-2 ${m.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                <p className="text-2xl font-black text-gray-100 tracking-tight">{m.value}<span className="text-sm font-medium text-gray-500 ml-0.5">%</span></p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1 font-bold">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Retrain Action Bar */}
          <div className="mt-auto flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Model Version 2.1</p>
              <p className="text-xs text-gray-500">Last trained: {modelMetrics.lastTrained}</p>
            </div>
            
            <button 
              onClick={handleRetrain} 
              disabled={retraining}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg ${
                retraining 
                  ? 'bg-emerald-500/20 text-emerald-500/50 cursor-not-allowed border border-emerald-500/20' 
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-emerald-900/20'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${retraining ? 'animate-spin' : ''}`} />
              {retraining ? 'Synthesizing Data...' : 'Initiate Retraining'}
            </button>
          </div>
        </GlassCard>

        {/* SYSTEM STATS CARD */}
        <GlassCard className="p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-6">
            <Server className="w-4 h-4 text-blue-400" /> Network Overview
          </h2>
          
          <div className="space-y-4">
            {[
              { label: 'Total Deployed Sensors', value: sensors.length, icon: Server },
              { label: 'Active Data Streams', value: onlineSensorsCount, icon: Wifi, color: 'text-emerald-400' },
              { label: 'Total Logged Predictions', value: modelMetrics.totalPredictions, icon: Activity },
              { label: 'Monitored Regions', value: activeRegionsCount, icon: Target },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <s.icon className={`w-4 h-4 ${s.color || 'text-gray-500'}`} />
                  {s.label}
                </div>
                <span className="text-sm font-bold text-gray-100">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Quick Health Check UI */}
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-gray-500 font-semibold uppercase tracking-wider">Network Health</span>
              <span className="text-emerald-400 font-bold">{Math.round((onlineSensorsCount / sensors.length) * 100)}% Optimal</span>
            </div>
            <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" 
                style={{ width: `${(onlineSensorsCount / sensors.length) * 100}%` }} 
              />
            </div>
          </div>
        </GlassCard>

      </div>

      {/* SENSOR MANAGEMENT TABLE */}
      <GlassCard className="overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-orange-400" /> Hardware Registry
          </h2>
        </div>
        
        <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/40 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                {['ID', 'Designation', 'Sector / Region', 'Uplink Status', 'Power', 'Command'].map((head, i) => (
                  <th key={i} className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-white/5">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sensors.map(s => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3 px-6 text-xs font-mono text-gray-500">{s.id.split('-')[0]}</td>
                  <td className="py-3 px-6 text-sm font-bold text-gray-200">{s.name}</td>
                  <td className="py-3 px-6 text-xs text-gray-400">{s.region}</td>
                  <td className="py-3 px-6">
                    <span 
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                        s.online 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}
                    >
                      {s.online ? <><Wifi className="w-3 h-3"/> Online</> : <><WifiOff className="w-3 h-3"/> Offline</>}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <Battery className={`w-4 h-4 ${s.battery < 20 ? 'text-red-400' : s.battery < 50 ? 'text-orange-400' : 'text-emerald-400'}`} />
                      <span className={s.battery < 20 ? 'text-red-400' : 'text-gray-300'}>{s.battery}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <button 
                      onClick={() => toast({ title: 'Sensor removed', description: `${s.name} has been unregistered from the array.` })}
                      className="p-1.5 rounded-md hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/30"
                      title="Decommission Sensor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

    </div>
  );
}