import { Activity, Bell, DollarSign, Gauge, TrendingDown, Zap } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-success-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome to EnergyHub Dashboard
            </h1>
            <p className="text-primary-100">
              Monitor your energy consumption, track savings, and optimize efficiency across all your virtual meters.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-8 h-8" />
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
          icon={<DollarSign className="w-6 h-6" />}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EnergyChart />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>

      {/* Meters Grid */}
      <MeterGrid />

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 rounded-xl p-6 border border-success-200 dark:border-success-800">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-success-600 rounded-xl">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-success-900 dark:text-success-100">
                Savings This Month
              </h3>
              <p className="text-2xl font-bold text-success-700 dark:text-success-300">
                ${stats?.savingsThisMonth?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-success-600 dark:text-success-400">
                15% better than last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-600 rounded-xl">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                System Status
              </h3>
              <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                All Systems Optimal
              </p>
              <p className="text-sm text-primary-600 dark:text-primary-400">
                {stats?.alerts || 0} active alerts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};