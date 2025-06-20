import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { useEnergyData } from '../../hooks/useEnergyData';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface EnergyChartProps {
  type?: 'area' | 'line';
  height?: number;
}

export const EnergyChart = ({
  type = 'area',
  height = 400,
}: EnergyChartProps) => {
  const { data: energyData, isLoading } = useEnergyData();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!energyData || energyData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">No data available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Energy Consumption Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={energyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="consumptionFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="costFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="period" stroke="#9ca3af" fontSize={12} />
              <YAxis domain={['auto', 'auto']} stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Legend />

              <Area
                type="monotone"
                dataKey="consumption"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#consumptionFill)"
                name="Consumption"
              />
              <Area
                type="monotone"
                dataKey="cost"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#costFill)"
                name="Cost"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};