import { BarChart3, Calendar, Download, Filter, TrendingUp } from 'lucide-react';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

interface ConsumptionData {
  month: string;
  electricity: number;
  gas: number;
  water: number;
  solar: number;
}

interface EfficiencyData {
  name: string;
  value: number;
  color: string;
}

interface CostData {
  category: string;
  amount: number;
  percentage: number;
}

const mockAnalyticsData = {
  consumption: [
    { month: 'Jan', electricity: 1200, gas: 800, water: 300, solar: -400 },
    { month: 'Feb', electricity: 1100, gas: 750, water: 280, solar: -450 },
    { month: 'Mar', electricity: 1300, gas: 820, water: 320, solar: -500 },
    { month: 'Apr', electricity: 1250, gas: 780, water: 310, solar: -480 },
    { month: 'May', electricity: 1400, gas: 900, water: 350, solar: -520 },
    { month: 'Jun', electricity: 1500, gas: 950, water: 380, solar: -600 },
  ] as ConsumptionData[],
  efficiency: [
    { name: 'Electricity', value: 85, color: '#0ea5e9' },
    { name: 'Solar', value: 92, color: '#10b981' },
    { name: 'Gas', value: 78, color: '#f59e0b' },
    { name: 'Water', value: 88, color: '#06b6d4' },
  ] as EfficiencyData[],
  costs: [
    { category: 'Electricity', amount: 2400, percentage: 45 },
    { category: 'Gas', amount: 1800, percentage: 34 },
    { category: 'Water', amount: 600, percentage: 11 },
    { category: 'Solar Credit', amount: -500, percentage: -10 },
  ] as CostData[],
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const Analytics = () => {
  const [timeRange, setTimeRange] = React.useState('6m');
  const [selectedMetric, setSelectedMetric] = React.useState('consumption');

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {entry.name}
                </span>
              </div>
              <span className="text-sm font-medium text-white dark:text-white">
                {entry.value} kWh
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Deep insights into your energy consumption patterns and efficiency
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon={<Filter className="w-4 h-4" />}>
            Filters
          </Button>
          <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
            Export
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="1m">Last Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-gray-500" />
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="consumption">Consumption</option>
                <option value="cost">Cost Analysis</option>
                <option value="efficiency">Efficiency</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600 dark:text-white">
                  Total Consumption
                </p>
                <p className="text-2xl font-bold text-primary-900 dark:text-white">
                  7,850 kWh
                </p>
                <p className="text-sm text-primary-600 dark:text-white flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5.2% vs last period
                </p>
              </div>
              <div className="p-3 bg-primary-600 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-success-600 dark:text-white">
                  Average Efficiency
                </p>
                <p className="text-2xl font-bold text-success-900 dark:text-white">
                  86%
                </p>
                <p className="text-sm text-success-600 dark:text-white flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.1% vs last period
                </p>
              </div>
              <div className="p-3 bg-success-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warning-600 dark:text-white">
                  Total Cost
                </p>
                <p className="text-2xl font-bold text-warning-900 dark:text-white">
                  ₹4,300
                </p>
                <p className="text-sm text-warning-600 dark:text-white flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  -8.5% vs last period
                </p>
              </div>
              <div className="p-3 bg-warning-600 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-error-50 to-error-100 dark:from-error-900/20 dark:to-error-800/20 border-error-200 dark:border-error-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-error-600 dark:text-white">
                  Peak Demand
                </p>
                <p className="text-2xl font-bold text-error-900 dark:text-white">
                  1,850 kW
                </p>
                <p className="text-sm text-error-600 dark:text-white flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.3% vs last period
                </p>
              </div>
              <div className="p-3 bg-error-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Consumption Trends */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalyticsData.consumption}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="electricity" fill="#0ea5e9" name="Electricity" />
                    <Bar dataKey="gas" fill="#f59e0b" name="Gas" />
                    <Bar dataKey="water" fill="#06b6d4" name="Water" />
                    <Bar dataKey="solar" fill="#10b981" name="Solar" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Efficiency Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Efficiency by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockAnalyticsData.efficiency}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalyticsData.costs.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${
                    item.category === 'Electricity' ? 'bg-primary-500' :
                    item.category === 'Gas' ? 'bg-warning-500' :
                    item.category === 'Water' ? 'bg-cyan-500' :
                    'bg-success-500'
                  }`}></div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`font-semibold ${
                    item.amount < 0 ? 'text-success-600' : 'text-gray-900 dark:text-white'
                  }`}>
                    ₹{Math.abs(item.amount).toLocaleString()}
                    {item.amount < 0 && ' (credit)'}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    item.percentage < 0 
                      ? 'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {item.percentage > 0 ? '+' : ''}{item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};