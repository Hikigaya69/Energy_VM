

import { Activity, Bell, Gauge, TrendingDown, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  FaChevronDown,
  FaDollarSign,
  FaEuroSign,
  FaRupeeSign,
  FaYenSign,
} from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { EnergyChartECharts } from '../components/dashboard/EnergyChart';
import { MeterGrid } from '../components/dashboard/MeterGrid';
import { StatsCard } from '../components/dashboard/StatsCard';
import { useDashboardStats } from '../hooks/useEnergyData';
import { useMonthlySummary } from '../hooks/useMonthlySummary';

const currencyMap = {
  INR: { icon: FaRupeeSign, symbol: '₹', rate: 1 },
  USD: { icon: FaDollarSign, symbol: '$', rate: 0.012 },
  EUR: { icon: FaEuroSign, symbol: '€', rate: 0.011 },
  JPY: { icon: FaYenSign, symbol: '¥', rate: 1.8 },
  AED: { icon: GiReceiveMoney, symbol: 'د.إ', rate: 0.044 },
  SAR: { icon: GiReceiveMoney, symbol: 'ر.س', rate: 0.045 },
  KWD: { icon: GiReceiveMoney, symbol: 'د.ك', rate: 0.0036 },
  BHD: { icon: GiReceiveMoney, symbol: '.د.ب', rate: 0.004 },
  QAR: { icon: GiReceiveMoney, symbol: 'ر.ق', rate: 0.044 },
  OMR: { icon: GiReceiveMoney, symbol: '﷼', rate: 0.004 },
  EGP: { icon: GiReceiveMoney, symbol: 'ج.م', rate: 0.56 }
};

type Currency = keyof typeof currencyMap;

export const Dashboard = () => {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: summary } = useMonthlySummary();

  const [currency, setCurrency] = useState<Currency>('INR');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const baseValue = summary?.totalCost || 0;
  const { rate, symbol, icon: CurrencyIcon } = currencyMap[currency];
  const convertedValue = baseValue * rate;

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
          value={summary?.totalConsumption || 0}
          icon={<Zap className="w-6 h-6" />}
          color="primary"
          format="number"
        />

        <StatsCard
          title="Monthly Cost"
          value={`${symbol}${convertedValue.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`}
          icon={
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                title={`Select Currency (${currency})`}
                className="hover:opacity-80 transition flex items-center gap-1"
              >
                <CurrencyIcon className="w-6 h-6" />
                <FaChevronDown className="w-3 h-3" />
              </button>
              {showDropdown && (
                <div className="absolute top-10 z-50 right-0 bg-white dark:bg-white border border-gray-200 dark:border-gray-700 rounded-md shadow-md p-2 w-40 space-y-2">
                  {(Object.keys(currencyMap) as Currency[]).map((cur) => {
                    const { icon: Icon, symbol } = currencyMap[cur];
                    return (
                      <button
                        key={cur}
                        onClick={() => {
                          setCurrency(cur);
                          setShowDropdown(false);
                        }}
                        className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          currency === cur ? 'bg-gray-200 dark:bg-gray-700' : ''
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{symbol} – {cur}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          }
          color="success"
          format="currency"
        />

        <StatsCard
          title="Efficiency (Dummy)"
          value={stats?.averageEfficiency || 0}
          icon={<Gauge className="w-6 h-6" />}
          color="warning"
          format="percentage"
        />

        <StatsCard
          title="Active Meters (Dummy)"
          value={stats?.activeMeters || 0}
          icon={<Activity className="w-6 h-6" />}
          color="primary"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <EnergyChartECharts />
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
              <h3 className="text-xl font-bold text-white dark:text-white mb-1">
                Savings This Month (Dummy)
              </h3>
              <p className="text-3xl font-bold text-white dark:text-white mb-2">
                ₹{stats?.savingsThisMonth?.toLocaleString() || 0}
              </p>
              <p className="text-white dark:text-white font-medium">
                15% better than last month
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-primary-900/30 dark:via-primary-800/20 dark:to-primary-700/10 rounded-2xl p-8 border border-primary-200/50 dark:border-primary-700/30 shadow-lg">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-300/30 rounded-full blur-xl"></div>
          <div className="relative flex items-center space-x-6">
            <div className="p-4 bg-primary-600 rounded-2xl shadow-lg">
              <Bell className="w-8 h-8 text-black dark:text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-600 dark:text-white mb-1">
                System Status (Dummy)
              </h3>
              <p className="text-3xl font-bold text-primary-600 dark:text-white mb-2">
                All Systems Optimal
              </p>
              <p className="text-primary-600 dark:text-white font-medium">
                {stats?.alerts || 0} active alerts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
