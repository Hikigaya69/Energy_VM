import { Activity, Bell, Gauge, TrendingDown, Zap } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { EnergyChart } from '../components/dashboard/EnergyChart';
import { MeterGrid } from '../components/dashboard/MeterGrid';
import { StatsCard } from '../components/dashboard/StatsCard';
import { useDashboardStats } from '../hooks/useEnergyData';


export const Dashboard = () => {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-24 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-success-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-success-400/20 rounded-full blur-2xl"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3 tracking-tight">
              Welcome to EnergyHub Dashboard
            </h1>
            <p className="text-primary-100 text-lg leading-relaxed max-w-2xl">
              Monitor your energy consumption, track savings, and optimize efficiency across all your virtual meters with real-time insights.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-20 h-20 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Consumption"
          value={stats?.totalConsumption || 0}
          change={-8.2}
          trend="down"
          icon={<Zap className="w-6 h-6" />}
          color="primary"
          format="number"
        />
        <StatsCard
          title="Monthly Cost"
          value={stats?.totalCost || 0}
          change={-12.5}
          trend="down"
          icon={<FaRupeeSign className="w-6 h-6" />}
          color="success"
          format="currency"
        />
        <StatsCard
          title="Efficiency"
          value={stats?.averageEfficiency || 0}
          change={5.1}
          trend="up"
          icon={<Gauge className="w-6 h-6" />}
          color="warning"
          format="percentage"
        />
        <StatsCard
          title="Active Meters"
          value={stats?.activeMeters || 0}
          icon={<Activity className="w-6 h-6" />}
          color="primary"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <EnergyChart />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>

      {/* Meters Grid */}
      <MeterGrid />

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-success-50 via-success-100 to-success-200 dark:from-success-900/30 dark:via-success-800/20 dark:to-success-700/10 rounded-2xl p-8 border border-success-200/50 dark:border-success-700/30 shadow-lg">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-success-300/30 rounded-full blur-xl"></div>
          <div className="relative flex items-center space-x-6">
            <div className="p-4 bg-success-600 rounded-2xl shadow-lg">
              <TrendingDown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-success-900 dark:text-success-100 mb-1">
                Savings This Month
              </h3>
              <p className="text-3xl font-bold text-success-700 dark:text-success-300 mb-2">
                ₹{stats?.savingsThisMonth?.toLocaleString() || 0}
              </p>
              <p className="text-success-600 dark:text-success-400 font-medium">
                15% better than last month
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-primary-900/30 dark:via-primary-800/20 dark:to-primary-700/10 rounded-2xl p-8 border border-primary-200/50 dark:border-primary-700/30 shadow-lg">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-300/30 rounded-full blur-xl"></div>
          <div className="relative flex items-center space-x-6">
            <div className="p-4 bg-primary-600 rounded-2xl shadow-lg">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-900 dark:text-primary-100 mb-1">
                System Status
              </h3>
              <p className="text-3xl font-bold text-primary-700 dark:text-primary-300 mb-2">
                All Systems Optimal
              </p>
              <p className="text-primary-600 dark:text-primary-400 font-medium">
                {stats?.alerts || 0} active alerts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};