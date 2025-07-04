import { clsx } from 'clsx';
import {
  BarChart2,
  BarChart3,
  Bell,
  Clock3,
  LayoutDashboard,
  LineChart,
  Settings,
  TrendingUp,
  Zap
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

//Check for lightts

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Virtual Meters(Dummy)', href: '/meters', icon: Zap },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  //{ name: 'Reports(Dummy)', href: '/reports', icon: FileText },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings(Dummy)', href: '/settings', icon: Settings },
  { name: 'Plotting', href: '/plot', icon: BarChart2 },
  { name: 'Shift-Wise Report', href: '/shift', icon: Clock3 },
  { name: 'BenchMark Analysis', href: '/benchmark', icon: TrendingUp },
  { name: 'Maxx Analysis', href: '/maxx', icon: LineChart }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 dark:border-gray-700',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-success-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-success-600 bg-clip-text text-transparent">
                EnergyHub
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    isActive
                      ? 'bg-primary-100 text-primary-100 dark:bg-primary-100 dark:text-white ring-2 ring-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )
                }
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-success-400 to-primary-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">H</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Hikigaya
                </p>

              </div>
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse-soft"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};