// import { NavLink, Outlet } from 'react-router-dom';
// import { LayoutDashboard, Map, Bell, BarChart3, Radio, Shield, Flame, TreePine } from 'lucide-react';

// const navItems = [
//   { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//   { to: '/map', icon: Map, label: 'Map View' },
//   { to: '/alerts', icon: Bell, label: 'Alerts' },
//   { to: '/analytics', icon: BarChart3, label: 'Analytics' },
//   { to: '/iot', icon: Radio, label: 'IoT Sensors' },
//   { to: '/admin', icon: Shield, label: 'Admin Panel' },
// ];

// export default function AppLayout() {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0">
//         <div className="p-5 flex items-center gap-3 border-b border-sidebar-border">
//           <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
//             <Flame className="w-5 h-5 text-sidebar-primary-foreground" />
//           </div>
//           <div>
//             <h1 className="font-bold text-sm text-sidebar-primary">GreenGuard</h1>
//             <p className="text-xs text-sidebar-foreground/60">FireWatch System</p>
//           </div>
//         </div>

//         <nav className="flex-1 p-3 space-y-1">
//           {navItems.map(({ to, icon: Icon, label }) => (
//             <NavLink
//               key={to}
//               to={to}
//               end={to === '/dashboard'}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                   isActive
//                     ? 'bg-sidebar-accent text-sidebar-primary'
//                     : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
//                 }`
//               }
//             >
//               <Icon className="w-4 h-4" />
//               {label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="p-4 border-t border-sidebar-border">
//           <div className="flex items-center gap-2 text-xs text-sidebar-foreground/50">
//             <TreePine className="w-3.5 h-3.5" />
//             <span>Hack For Green Bharat</span>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }









// import { NavLink, Outlet } from 'react-router-dom';
// import { LayoutDashboard, Map, Bell, BarChart3, Radio, Shield, Flame, TreePine } from 'lucide-react';

// const navItems = [
//   { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//   { to: '/map', icon: Map, label: 'Map View' },
//   { to: '/alerts', icon: Bell, label: 'Alerts' },
//   { to: '/analytics', icon: BarChart3, label: 'Analytics' },
//   { to: '/iot', icon: Radio, label: 'IoT Sensors' },
//   { to: '/admin', icon: Shield, label: 'Admin Panel' },
// ];

// export default function AppLayout() {
//   // High Quality Dark Forest Image
//   const bgImage = "url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop')";

//   return (
//     // 1. MAIN WRAPPER: Black background & White text default
//     <div className="flex h-screen overflow-hidden bg-black text-white font-sans selection:bg-green-500/30">
      
//       {/* 2. BACKGROUND IMAGE LAYER (Fixed behind everything) */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div 
//           className="absolute inset-0 bg-cover bg-center opacity-60" 
//           style={{ backgroundImage: bgImage }} 
//         />
//         {/* Dark Overlay taaki text clear dikhe */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#05100a] via-[#0a150f]/85 to-black/95" />
//       </div>

//       {/* 3. SIDEBAR (Glass Effect) */}
//       <aside className="relative z-20 w-64 h-full flex flex-col shrink-0 border-r border-white/10 bg-black/20 backdrop-blur-xl transition-all">
        
//         {/* Sidebar Header */}
//         <div className="p-6 flex items-center gap-3 border-b border-white/10">
//           <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
//             <Flame className="w-5 h-5 text-green-400 fill-green-400/20" />
//           </div>
//           <div>
//             <h1 className="font-bold text-lg tracking-wide text-white">GreenGuard</h1>
//             <p className="text-xs text-green-400/70 font-medium">FireWatch System</p>
//           </div>
//         </div>

//         {/* Navigation Items */}
//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//           {navItems.map(({ to, icon: Icon, label }) => (
//             <NavLink
//               key={to}
//               to={to}
//               end={to === '/dashboard'} // Sirf dashboard ke liye exact match
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
//                   isActive
//                     ? 'bg-green-600/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-900/20'
//                     : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
//                 }`
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-green-400' : 'text-gray-500 group-hover:text-white'}`} />
//                   {label}
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Sidebar Footer */}
//         <div className="p-4 border-t border-white/10 bg-black/20">
//           <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-green-400 transition-colors cursor-default">
//             <TreePine className="w-3.5 h-3.5" />
//             <span>Hack For Green Bharat</span>
//           </div>
//         </div>
//       </aside>

//       {/* 4. MAIN CONTENT AREA */}
//       <main className="relative z-10 flex-1 overflow-auto p-4 md:p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// }


import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Map, Bell, BarChart3, Radio, Shield, Flame, TreePine } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/map', icon: Map, label: 'Map View' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/iot', icon: Radio, label: 'IoT Sensors' },
  { to: '/admin', icon: Shield, label: 'Admin Panel' },
];

export default function AppLayout() {
  // Background Image for the main content area only
  const bgImage = "url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop')";

  return (
    <div className="flex h-screen overflow-hidden bg-[#050a07] text-gray-100 font-sans">
      
      {/* 1. SOLID SIDEBAR (Old Style) */}
      <aside className="w-64 bg-[#0a1410] flex flex-col shrink-0 border-r border-[#1a2e25] z-30">
        <div className="p-6 flex items-center gap-3 border-b border-[#1a2e25]">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/50">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide text-white">GreenGuard</h1>
            <p className="text-xs text-emerald-400/70 font-medium">FireWatch System</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20' // Subtle active state
                    : 'text-gray-400 hover:bg-[#15221d] hover:text-gray-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1a2e25] bg-[#08100c]">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <TreePine className="w-3.5 h-3.5" />
            <span>Hack For Green Bharat</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA (With Background) */}
      <main className="relative flex-1 overflow-y-auto overflow-x-hidden">
        {/* Fixed Background Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none">
           {/* Sidebar ke peeche background na dikhe isliye left-64 use kar sakte hain, 
               par simple rakhne ke liye pure pe laga rahe hain */}
           <div 
            className="absolute inset-0 bg-cover bg-center opacity-40" 
            style={{ backgroundImage: bgImage }} 
          />
          {/* Dark Overlay for content readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#050a07] via-[#050a07]/90 to-[#000000]/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}