import { format, parseISO } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useEnergyData } from '../../hooks/useEnergyData';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const EnergyChart = ({
  type = 'area',
  height = 400,
}) => {
  const { data: energyData, isLoading } = useEnergyData();
  console.log("Energy Data:", energyData);

  const formatXAxis = (tickItem) => {
    try {
      return format(parseISO(tickItem), 'MMM dd');
    } catch (error) {
      return tickItem;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {format(parseISO(label), 'MMMM dd, yyyy')}
          </p>
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
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {entry.name === 'Cost' ? `₹${entry.value}` : 
                 entry.name === 'Efficiency' ? `${entry.value}%` : 
                 `${entry.value} kWh`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

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

  const ChartComponent = type === 'area' ? AreaChart : LineChart;
  const DataComponent = type === 'area' ? Area : Line;

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Energy Consumption Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent 
              data={energyData} 
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                strokeOpacity={0.5}
                className="dark:stroke-gray-600"
              />
              <XAxis
                dataKey="period"
                tickFormatter={formatXAxis}
                stroke="#6b7280"
                fontSize={12}
                className="dark:stroke-gray-400"
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                className="dark:stroke-gray-400"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {type === 'area' ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="consumption"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    fill="url(#consumptionGradient)"
                    name="Consumption"
                  />
                  <Area
                    type="monotone"
                    dataKey="cost"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#costGradient)"
                    name="Cost"
                  />
                </>
              ) : (
                <>
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    name="Consumption"
                    dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Cost"
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  />
                </>
              )}
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};