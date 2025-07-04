import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Clock, Info, X } from 'lucide-react';
import React from 'react';
import { useAlertStore } from '../../store/useAlertStore';
import { Alert } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const alertIcons = {
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Info,
};

const alertColors = {
  warning: 'text-warning-500',
  error: 'text-error-500',
  info: 'text-primary-500',
};

interface AlertItemProps {
  alert: Alert;
  onDismiss: (id: string) => void;
}

const AlertItem = ({ alert, onDismiss }: AlertItemProps) => {
  const Icon = alertIcons[alert.type];

  return (
    <div
      className={`p-4 rounded-lg border transition-all duration-200 ${
        alert.read
          ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
          : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 shadow-sm'
      }`}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 mt-0.5 ${alertColors[alert.type]}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4
                className={`text-sm font-medium ${
                  alert.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                }`}
              >
                {alert.title}
              </h4>
              <p
                className={`text-sm mt-1 ${
                  alert.read ? 'text-gray-500 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {alert.message}
              </p>
              <div className="flex items-center space-x-3 mt-2">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                </div>
                <Badge variant="secondary" size="sm">
                  {alert.tagId}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss(alert.id)}
              className="ml-2 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AlertsPanel = () => {
  const alerts = useAlertStore((state) => state.alerts);
  const dismissAlert = useAlertStore((state) => state.dismissAlert);

  const [dismissedAlerts, setDismissedAlerts] = React.useState(new Set<string>());

  const handleDismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => new Set([...prev, alertId]));
    dismissAlert(alertId); // optionally persist to store
  };

  const visibleAlerts = alerts.filter((alert) => !dismissedAlerts.has(alert.id));
  const unreadCount = visibleAlerts.filter((alert) => !alert.read).length;

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Alerts</CardTitle>
          {unreadCount > 0 && <Badge variant="error">{unreadCount} new</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        {visibleAlerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-success-600 dark:text-success-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">No active alerts</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {visibleAlerts.slice(0, 5).map((alert) => (
              <AlertItem
                key={alert.id}
                alert={{ ...alert, timestamp: new Date(alert.timestamp), read: alert.read ?? false }}
                onDismiss={handleDismissAlert}
              />
            ))}
            {visibleAlerts.length > 5 && (
              <div className="text-center pt-2">
                <Button variant="ghost" size="sm">
                  View all alerts ({visibleAlerts.length - 5} more)
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
