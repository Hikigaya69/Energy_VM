import { Calendar, Download, FileText, Mail, Plus, Search } from 'lucide-react';
import React from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const mockReports = [
  {
    id: '1',
    name: 'Monthly Energy Summary',
    description: 'Comprehensive overview of energy consumption and costs',
    type: 'summary',
    schedule: 'monthly',
    lastGenerated: '2024-01-15T10:30:00Z',
    status: 'completed',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Efficiency Analysis Report',
    description: 'Detailed analysis of energy efficiency across all meters',
    type: 'analysis',
    schedule: 'weekly',
    lastGenerated: '2024-01-20T14:15:00Z',
    status: 'completed',
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Cost Optimization Report',
    description: 'Recommendations for reducing energy costs',
    type: 'optimization',
    schedule: 'quarterly',
    lastGenerated: '2024-01-18T09:45:00Z',
    status: 'generating',
    size: null,
  },
  {
    id: '4',
    name: 'Compliance Report',
    description: 'Energy usage compliance with regulatory standards',
    type: 'compliance',
    schedule: 'monthly',
    lastGenerated: '2024-01-10T16:20:00Z',
    status: 'failed',
    size: null,
  },
];

// const reportTypes = {
//   summary: { color: 'primary', label: 'Summary' },
//   analysis: { color: 'success', label: 'Analysis' },
//   optimization: { color: 'warning', label: 'Optimization' },
//   compliance: { color: 'error', label: 'Compliance' },
// };

const statusTypes = {
  completed: { color: 'success', label: 'Completed' },
  generating: { color: 'warning', label: 'Generating' },
  failed: { color: 'error', label: 'Failed' },
  scheduled: { color: 'secondary', label: 'Scheduled' },
};

const ReportCard = ({ report }) => {
  // const reportType = reportTypes[report.type];
  const statusType = statusTypes[report.status];

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-white dark:text-white">
                {report.name}
              </h3>
              {/* <Badge variant={reportType.color}>
                {reportType.label}
              </Badge> */}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {report.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Schedule: {report.schedule}</span>
              {report.size && <span>Size: {report.size}</span>}
            </div>
          </div>
          <Badge variant={statusType.color}>
            {statusType.label}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-2">
            {report.status === 'completed' && (
              <>
                <Button variant="ghost" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm">
              <FileText className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Reports = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  const [filterStatus, setFilterStatus] = React.useState('all');

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate and manage energy consumption reports
          </p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
          Create Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-700">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary-900 dark:text-white mb-1">
              {mockReports.length}
            </div>
            <div className="text-sm text-primary-600 dark:text-white">
              Total Reports
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-700">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-success-900 dark:text-white mb-1">
              {mockReports.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-sm text-black dark:text-white">
              Completed
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-700">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-warning-900 dark:text-white mb-1">
              {mockReports.filter(r => r.status === 'generating').length}
            </div>
            <div className="text-sm text-warning-100 dark:text-white">
              In Progress
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-error-50 to-error-100 dark:from-error-900/20 dark:to-error-800/20 border-error-200 dark:border-error-700">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-error-900 dark:text-white mb-1">
              {mockReports.filter(r => r.status === 'failed').length}
            </div>
            <div className="text-sm text-error-600 dark:text-white">
              Failed
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
                placeholder="Search reports..."
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
              <option value="summary">Summary</option>
              <option value="analysis">Analysis</option>
              <option value="optimization">Optimization</option>
              <option value="compliance">Compliance</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="generating">Generating</option>
              <option value="failed">Failed</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No reports found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first report'
              }
            </p>
            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
              Create Report
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Upcoming Scheduled Reports</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Weekly Efficiency Analysis
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Next generation: Tomorrow at 9:00 AM
                </p>
              </div>
              <Badge variant="secondary">Weekly</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Monthly Energy Summary
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Next generation: February 1st at 8:00 AM
                </p>
              </div>
              <Badge variant="secondary">Monthly</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};