import { AlertTriangle, CheckCircle, Clock, Droplets, Edit, MoreVertical, Plus, Search, Sun, Thermometer, Trash2, XCircle, Zap } from 'lucide-react';
import React from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useVirtualMeters } from '../hooks/useEnergyData';

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
  active: 'success',
  inactive: 'secondary',
  maintenance: 'warning',
  error: 'error',
};

const MeterCard = ({ meter }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const MeterIcon = meterIcons[meter.type];
  const StatusIcon = statusIcons[meter.status];

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-xl">
              <MeterIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {meter.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {meter.location}
              </p>
              <Badge variant={statusVariants[meter.status]} className="mt-2">
                <StatusIcon className="w-3 h-3 mr-1" />
                {meter.status}
              </Badge>
            </div>
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Edit className="w-4 h-4 mr-3" />
                  Edit Meter
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20">
                  <Trash2 className="w-4 h-4 mr-3" />
                  Delete Meter
                </button>
              </div>
            )}
          </div>
        </div>

        {meter.lastReading && (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Current Reading
                </span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {meter.lastReading.value.toLocaleString()} {meter.lastReading.unit}
                </span>
              </div>
              
              {meter.efficiency && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Efficiency
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-error-500 via-warning-500 to-success-500 rounded-full transition-all duration-500"
                        style={{ width: `${meter.efficiency}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {meter.efficiency}%
                    </span>
                  </div>
                </div>
              )}

              {meter.cost !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Monthly Cost
                  </span>
                  <span className={`text-sm font-semibold ${
                    meter.cost < 0 
                      ? 'text-success-600 dark:text-success-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {meter.cost < 0 ? '+' : ''}${Math.abs(meter.cost).toLocaleString()}
                    {meter.cost < 0 && ' (credit)'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const VirtualMeters = () => {
  const { data: meters, isLoading } = useVirtualMeters();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');

  const filteredMeters = meters?.filter(meter => {
    const matchesSearch = meter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meter.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || meter.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Virtual Meters</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and monitor all your energy meters in one place
          </p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add New Meter
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search meters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
              <option value="error">Error</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Meters Grid */}
      {filteredMeters.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No meters found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first virtual meter'
              }
            </p>
            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
              Add New Meter
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMeters.map((meter) => (
            <MeterCard key={meter.id} meter={meter} />
          ))}
        </div>
      )}
    </div>
  );
};