import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Map, Bell, BarChart3, Radio, Shield, Flame, TreePine } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/map', icon: Map, label: 'Map View' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/iot', icon: Radio, label: 'IoT Sensors' },
  { to: '/admin', icon: Shield, label: 'Admin Panel' },
];

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0">
        <div className="p-5 flex items-center gap-3 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Flame className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-sidebar-primary">GreenGuard</h1>
            <p className="text-xs text-sidebar-foreground/60">FireWatch System</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2 text-xs text-sidebar-foreground/50">
            <TreePine className="w-3.5 h-3.5" />
            <span>Hack For Green Bharat</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
