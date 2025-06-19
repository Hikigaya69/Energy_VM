import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Bell, CheckCircle, Clock, Info, Search, Settings, X } from 'lucide-react';
import React from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useAlerts } from '../hooks/useEnergyData';

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

const AlertItem = ({ alert, onDismiss, onMarkRead }) => {
  const Icon = alertIcons[alert.type];

  return (
    <Card className={`transition-all duration-200 ${
      alert.read 
        ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-lg ${
            alert.type === 'error' ? 'bg-error-100 dark:bg-error-900/20' :
            alert.type === 'warning' ? 'bg-warning-100 dark:bg-warning-900/20' :
            'bg-primary-100 dark:bg-primary-900/20'
          }`}>
            <Icon className={`w-5 h-5 ${alertColors[alert.type]}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h4 className={`text-lg font-semibold ${
                alert.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'
              }`}>
                {alert.title}
              </h4>
              <div className="flex items-center space-x-2 ml-4">
                {!alert.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMarkRead(alert.id)}
                    className="text-xs"
                  >
                    Mark as read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss(alert.id)}
                  className="p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <p className={`text-sm mb-3 ${
              alert.read ? 'text-gray-500 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
            }`}>
              {alert.message}
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
              </div>
              {alert.meterId && (
                <Badge variant="secondary" size="sm">
                  Meter #{alert.meterId}
                </Badge>
              )}
              <Badge variant={alert.type === 'error' ? 'error' : alert.type === 'warning' ? 'warning' : 'primary'} size="sm">
                {alert.type.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Alerts = () => {
  const { data: alerts, isLoading } = useAlerts();
  const [dismissedAlerts, setDismissedAlerts] = React.useState(new Set());
  const [readAlerts, setReadAlerts] = React.useState(new Set());
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  const [filterStatus, setFilterStatus] = React.useState('all');

  const handleDismissAlert = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const handleMarkAsRead = (alertId) => {
    setReadAlerts(prev => new Set([...prev, alertId]));
  };

  const processedAlerts = alerts?.map(alert => ({
    ...alert,
    read: alert.read || readAlerts.has(alert.id)
  })).filter(alert => !dismissedAlerts.has(alert.id)) || [];

  const filteredAlerts = processedAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'read' && alert.read) ||
                         (filterStatus === 'unread' && !alert.read);
    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = processedAlerts.filter(alert => !alert.read).length;
  const criticalCount = processedAlerts.filter(alert => alert.type === 'error').length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-24 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alerts</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and manage system alerts and notifications
          </p>
        </div>
        <Button variant="secondary" icon={<Settings className="w-4 h-4" />}>
          Alert Settings
        </Button>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600 dark:text-white">
                  Total Alerts
                </p>
                <p className="text-2xl font-bold text-primary-900 dark:text-white">
                  {processedAlerts.length}
                </p>
              </div>
              <div className="p-3 bg-primary-600 rounded-xl">
                <Bell className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warning-600 dark:text-white">
                  Unread Alerts
                </p>
                <p className="text-2xl font-bold text-warning-900 dark:text-white">
                  {unreadCount}
                </p>
              </div>
              <div className="p-3 bg-warning-600 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-error-50 to-error-100 dark:from-error-900/20 dark:to-error-800/20 border-error-200 dark:border-error-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-error-600 dark:text-white">
                  Critical Alerts
                </p>
                <p className="text-2xl font-bold text-error-900 dark:text-white">
                  {criticalCount}
                </p>
              </div>
              <div className="p-3 bg-error-600 rounded-xl">
                <X className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-success-100 dark:bg-success-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success-600 dark:text-success-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {processedAlerts.length === 0 ? 'No alerts' : 'No matching alerts'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {processedAlerts.length === 0 
                ? 'All systems are running smoothly'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              onDismiss={handleDismissAlert}
              onMarkRead={handleMarkAsRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};