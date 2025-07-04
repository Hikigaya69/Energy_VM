// import { formatDistanceToNow } from 'date-fns';
// import {
//   AlertTriangle,
//   Bell,
//   CheckCircle,
//   Clock,
//   Info,
//   Search,
//   Settings,
//   X,
// } from 'lucide-react';
// import React, { useState } from 'react';

// import { Badge } from '../components/ui/Badge';
// import { Button } from '../components/ui/Button';
// import { Card, CardContent } from '../components/ui/Card';
// import { useAlertStore } from '../store/useAlertStore';

// // === Types ===
// type AlertType = 'error' | 'warning' | 'info';

// type Alert = {
//   id: string;
//   title: string;
//   message: string;
//   timestamp: Date | string | number;
//   tagId: string;
//   type: AlertType;
//   read: boolean;
// };

// // === Icons and Colors ===
// const alertIcons: Record<AlertType, React.ElementType> = {
//   warning: AlertTriangle,
//   error: AlertTriangle,
//   info: Info,
// };

// const alertColors: Record<AlertType, string> = {
//   warning: 'text-warning-500',
//   error: 'text-error-500',
//   info: 'text-primary-500',
// };

// // === Single Alert Card ===
// const AlertItem = ({
//   alert,
//   onDismiss,
//   onMarkRead,
// }: {
//   alert: Alert;
//   onDismiss: (id: string) => void;
//   onMarkRead: (id: string) => void;
// }) => {
//   const Icon = alertIcons[alert.type];
//   const parsedTime =
//     alert.timestamp instanceof Date
//       ? alert.timestamp
//       : new Date(alert.timestamp);

//   return (
//     <Card
//       className={`transition-all duration-200 ${
//         alert.read
//           ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
//           : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md'
//       }`}
//     >
//       <CardContent className="p-6">
//         <div className="flex items-start space-x-4">
//           <div
//             className={`p-2 rounded-lg ${
//               alert.type === 'error'
//                 ? 'bg-error-100 dark:bg-error-900/20'
//                 : alert.type === 'warning'
//                 ? 'bg-warning-100 dark:bg-warning-900/20'
//                 : 'bg-primary-100 dark:bg-primary-900/20'
//             }`}
//           >
//             <Icon className={`w-5 h-5 ${alertColors[alert.type]}`} />
//           </div>

//           <div className="flex-1 min-w-0">
//             <div className="flex items-start justify-between mb-2">
//               <h4
//                 className={`text-lg font-semibold ${
//                   alert.read
//                     ? 'text-gray-600 dark:text-gray-400'
//                     : 'text-gray-900 dark:text-white'
//                 }`}
//               >
//                 {alert.title}
//               </h4>
//               <div className="flex items-center space-x-2 ml-4">
//                 {!alert.read && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => onMarkRead(alert.id)}
//                     className="text-xs"
//                   >
//                     Mark as read
//                   </Button>
//                 )}
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => onDismiss(alert.id)}
//                   className="p-1 h-auto"
//                 >
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>

//             <p
//               className={`text-sm mb-3 ${
//                 alert.read
//                   ? 'text-gray-500 dark:text-gray-500'
//                   : 'text-gray-600 dark:text-gray-300'
//               }`}
//             >
//               {alert.message}
//             </p>

//             <div className="flex items-center space-x-4">
//               <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
//                 <Clock className="w-3 h-3 mr-1" />
//                 {formatDistanceToNow(parsedTime, { addSuffix: true })}
//               </div>
//               <Badge variant="secondary" size="sm">
//                 {alert.tagId}
//               </Badge>
//               <Badge
//                 variant={
//                   alert.type === 'error'
//                     ? 'error'
//                     : alert.type === 'warning'
//                     ? 'warning'
//                     : 'primary'
//                 }
//                 size="sm"
//               >
//                 {alert.type.toUpperCase()}
//               </Badge>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// // === Main Alerts Page ===
// const Alerts: React.FC = () => {
//   //  Zustand store (with individual selectors to avoid infinite loop)
//   const alerts = useAlertStore((state) => state.alerts);
//   const markAsRead = useAlertStore((state) => state.markAsRead);
//   const dismissAlert = useAlertStore((state) => state.dismissAlert);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState<'all' | AlertType>('all');
//   const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');

//   const filteredAlerts = alerts.filter((alert) => {
//     const matchesSearch =
//       alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       alert.message.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = filterType === 'all' || alert.type === filterType;
//     const matchesStatus =
//       filterStatus === 'all' ||
//       (filterStatus === 'read' && alert.read) ||
//       (filterStatus === 'unread' && !alert.read);
//     return matchesSearch && matchesType && matchesStatus;
//   });

//   const unreadCount = alerts.filter((a) => !a.read).length;
//   const criticalCount = alerts.filter((a) => a.type === 'error').length;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alerts</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">
//             Monitor and manage system alerts and notifications
//           </p>
//         </div>
//         <Button variant="secondary" icon={<Settings className="w-4 h-4" />}>
//           Alert Settings
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardContent className="p-6 flex justify-between items-center">
//             <div>
//               <p className="text-sm text-primary-500 font-medium">Total Alerts</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                 {alerts.length}
//               </p>
//             </div>
//             <Bell className="w-6 h-6 text-primary-500" />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6 flex justify-between items-center">
//             <div>
//               <p className="text-sm text-warning-500 font-medium">Unread Alerts</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                 {unreadCount}
//               </p>
//             </div>
//             <AlertTriangle className="w-6 h-6 text-warning-500" />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6 flex justify-between items-center">
//             <div>
//               <p className="text-sm text-error-500 font-medium">Critical Alerts</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                 {criticalCount}
//               </p>
//             </div>
//             <X className="w-6 h-6 text-error-500" />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search alerts..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//               />
//             </div>
//             <select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value as AlertType | 'all')}
//               className="px-4 py-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//             >
//               <option value="all">All Types</option>
//               <option value="error">Error</option>
//               <option value="warning">Warning</option>
//               <option value="info">Info</option>
//             </select>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value as 'all' | 'read' | 'unread')}
//               className="px-4 py-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//             >
//               <option value="all">All Status</option>
//               <option value="unread">Unread</option>
//               <option value="read">Read</option>
//             </select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Alert List */}
//       {filteredAlerts.length === 0 ? (
//         <Card>
//           <CardContent className="p-12 text-center">
//             <CheckCircle className="w-8 h-8 text-success-500 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//               No Alerts
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400">
//               All systems are running smoothly.
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="space-y-4">
//           {filteredAlerts.map((alert) => (
//             <AlertItem
//               key={alert.id}
//               alert={{
//                 ...alert,
//                 timestamp: alert.timestamp ?? new Date(),
//                 read: alert.read ?? false,
//               }}
//               onDismiss={dismissAlert}
//               onMarkRead={markAsRead}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Alerts;



import { formatDistanceToNow } from 'date-fns';
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Info,
  Search,
  Settings,
  X,
} from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useAlertStore } from '../store/useAlertStore';

// === Types ===
type AlertType = 'error' | 'warning' | 'info';

type Alert = {
  id: string;
  title: string;
  message: string;
  timestamp: Date | string | number;
  tagId: string;
  type: AlertType;
  read: boolean;
};

// === Icons and Colors ===
const alertIcons: Record<AlertType, React.ElementType> = {
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Info,
};

const alertColors: Record<AlertType, string> = {
  warning: 'text-warning-500',
  error: 'text-error-500',
  info: 'text-primary-500',
};

// === Single Alert Card ===
const AlertItem = ({
  alert,
  onDismiss,
  onMarkRead,
}: {
  alert: Alert;
  onDismiss: (id: string) => void;
  onMarkRead: (id: string) => void;
}) => {
  const Icon = alertIcons[alert.type];
  const parsedTime =
    alert.timestamp instanceof Date
      ? alert.timestamp
      : new Date(alert.timestamp);

  return (
    <Card
      className={`transition-all duration-200 ${
        alert.read
          ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md'
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div
            className={`p-2 rounded-lg ${
              alert.type === 'error'
                ? 'bg-error-100 dark:bg-error-900/20'
                : alert.type === 'warning'
                ? 'bg-warning-100 dark:bg-warning-900/20'
                : 'bg-primary-100 dark:bg-primary-900/20'
            }`}
          >
            <Icon className={`w-5 h-5 ${alertColors[alert.type]}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h4
                className={`text-lg font-semibold ${
                  alert.read
                    ? 'text-gray-600 dark:text-gray-400'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
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

            <p
              className={`text-sm mb-3 ${
                alert.read
                  ? 'text-gray-500 dark:text-gray-500'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {alert.message}
            </p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {formatDistanceToNow(parsedTime, { addSuffix: true })}
              </div>
              <Badge variant="secondary" size="sm">
                {alert.tagId}
              </Badge>
              <Badge
                variant={
                  alert.type === 'error'
                    ? 'error'
                    : alert.type === 'warning'
                    ? 'warning'
                    : 'primary'
                }
                size="sm"
              >
                {alert.type.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// === Main Alerts Page ===
const Alerts: React.FC = () => {
  const alerts = useAlertStore((state) => state.alerts);
  const markAsRead = useAlertStore((state) => state.markAsRead);
  const dismissAlert = useAlertStore((state) => state.dismissAlert);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | AlertType>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'read' && alert.read) ||
      (filterStatus === 'unread' && !alert.read);
    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;
  const criticalCount = alerts.filter((a) => a.type === 'error').length;

  // === Group alerts by tagId ===
  const groupedAlerts = filteredAlerts.reduce<Record<string, Alert[]>>((acc, alert) => {
    const key = alert.tagId || 'Unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push({ ...alert, read: alert.read ?? false });
    return acc;
  }, {});

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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-primary-500 font-medium">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {alerts.length}
              </p>
            </div>
            <Bell className="w-6 h-6 text-primary-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-warning-500 font-medium">Unread Alerts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {unreadCount}
              </p>
            </div>
            <AlertTriangle className="w-6 h-6 text-warning-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-error-500 font-medium">Critical Alerts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {criticalCount}
              </p>
            </div>
            <X className="w-6 h-6 text-error-500" />
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
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as AlertType | 'all')}
              className="px-4 py-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'read' | 'unread')}
              className="px-4 py-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Grouped Alert List */}
      {filteredAlerts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-8 h-8 text-success-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              No Alerts
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              All systems are running smoothly.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedAlerts).map(([tagId, alerts]) => (
            <div key={tagId} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {tagId} Alerts
              </h2>
              {alerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={{
                    ...alert,
                    timestamp: alert.timestamp ?? new Date(),
                    read: alert.read ?? false,
                  }}
                  onDismiss={dismissAlert}
                  onMarkRead={markAsRead}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;
