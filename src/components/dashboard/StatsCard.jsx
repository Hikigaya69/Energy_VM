import { clsx } from 'clsx';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

export const StatsCard = ({
  title,
  value,
  change,
  trend = 'stable',
  icon,
  color = 'primary',
  format = 'number',
}) => {
  const formatValue = (val) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return `$${val.toLocaleString()}`;
      case 'percentage':
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  };

  const trendColors = {
    up: 'text-success-600',
    down: 'text-error-600',
    stable: 'text-gray-500',
  };

  const iconColors = {
    primary: 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400',
    success: 'bg-success-100 text-success-600 dark:bg-success-900 dark:text-success-400',
    warning: 'bg-warning-100 text-warning-600 dark:bg-warning-900 dark:text-warning-400',
    error: 'bg-error-100 text-error-600 dark:bg-error-900 dark:text-error-400',
  };

  const TrendIcon = trendIcons[trend];

  return (
    <Card className="animate-fade-in" hover>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <TrendIcon className={clsx('w-4 h-4 mr-1', trendColors[trend])} />
              <span className={clsx('text-sm font-medium', trendColors[trend])}>
                {Math.abs(change)}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className={clsx('p-3 rounded-lg', iconColors[color])}>
          {icon}
        </div>
      </div>
    </Card>
  );
};