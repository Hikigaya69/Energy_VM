import { AlertTriangle, CheckCircle, Clock, Droplets, Sun, Thermometer, XCircle, Zap } from 'lucide-react';
import { useVirtualMeters } from '../../hooks/useEnergyData';
import { VirtualMeter } from '../../types';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const meterIcons = {
  electricity: Zap,
  solar: Sun,
  gas: Thermometer,
  water: Droplets,
};

const statusIcons = {
  active: CheckCircle,
  inactive: XCircle,
  maintenance: Clock,
  error: AlertTriangle,
};

const statusVariants = {
  active: 'success' as const,
  inactive: 'secondary' as const,
  maintenance: 'warning' as const,
  error: 'error' as const,
};

interface MeterCardProps {
  meter: VirtualMeter;
}

const MeterCard = ({ meter }: MeterCardProps) => {
  const MeterIcon = meterIcons[meter.type];
  const StatusIcon = statusIcons[meter.status];

  return (
    <Card hover className="animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
            <MeterIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {meter.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {meter.location}
            </p>
          </div>
        </div>
        <Badge variant={statusVariants[meter.status]}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {meter.status}
        </Badge>
      </div>

      {meter.lastReading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Current Reading
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {meter.lastReading.value.toLocaleString()} {meter.lastReading.unit}
            </span>
          </div>

          {meter.efficiency && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Efficiency
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-error-500 via-warning-500 to-success-500 rounded-full transition-all duration-300"
                    style={{ width: `${meter.efficiency}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {meter.efficiency}%
                </span>
              </div>
            </div>
          )}

          {meter.cost !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Monthly Cost
              </span>
              <span className={`text-sm font-medium ${
                meter.cost < 0 
                  ? 'text-success-600 dark:text-success-400' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {meter.cost < 0 ? '+' : ''}₹{Math.abs(meter.cost).toLocaleString()}
                {meter.cost < 0 && ' (credit)'}
              </span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export const MeterGrid = () => {
  const { data: meters, isLoading } = useVirtualMeters();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Virtual Meters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Virtual Meters (Dummy)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meters?.map((meter) => (
            <MeterCard key={meter.id} meter={meter} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};