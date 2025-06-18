import { Edit, Mail, MoreVertical, Plus, Search, Shield, Trash2, User, UserCheck } from 'lucide-react';
import React from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const mockUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@energyhub.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-20T14:30:00Z',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    permissions: ['read', 'write', 'admin'],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@energyhub.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-20T10:15:00Z',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    permissions: ['read', 'write'],
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@energyhub.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-19T16:45:00Z',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    permissions: ['read'],
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.wilson@energyhub.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-01-15T09:20:00Z',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    permissions: ['read'],
  },
];

const roleColors = {
  admin: 'error',
  manager: 'warning',
  user: 'primary',
};

const statusColors = {
  active: 'success',
  inactive: 'secondary',
  suspended: 'error',
};

const UserCard = ({ user }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.email}
                </p>
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
                      Edit User
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Mail className="w-4 h-4 mr-3" />
                      Send Email
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20">
                      <Trash2 className="w-4 h-4 mr-3" />
                      Delete User
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mb-3">
              <Badge variant={roleColors[user.role]}>
                <Shield className="w-3 h-3 mr-1" />
                {user.role.toUpperCase()}
              </Badge>
              <Badge variant={statusColors[user.status]}>
                <UserCheck className="w-3 h-3 mr-1" />
                {user.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Last login: {new Date(user.lastLogin).toLocaleDateString()} at{' '}
              {new Date(user.lastLogin).toLocaleTimeString()}
            </div>
            
            <div className="flex flex-wrap gap-1">
              {user.permissions.map((permission) => (
                <span
                  key={permission}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Users = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterRole, setFilterRole] = React.useState('all');
  const [filterStatus, setFilterStatus] = React.useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUsers = mockUsers.filter(user => user.status === 'active').length;
  const adminUsers = mockUsers.filter(user => user.role === 'admin').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add New User
        </Button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-primary-900 dark:text-primary-100">
                  {mockUsers.length}
                </p>
              </div>
              <div className="p-3 bg-primary-600 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-success-600 dark:text-success-400">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-success-900 dark:text-success-100">
                  {activeUsers}
                </p>
              </div>
              <div className="p-3 bg-success-600 rounded-xl">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border-warning-200 dark:border-warning-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warning-600 dark:text-warning-400">
                  Administrators
                </p>
                <p className="text-2xl font-bold text-warning-900 dark:text-warning-100">
                  {adminUsers}
                </p>
              </div>
              <div className="p-3 bg-warning-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-error-50 to-error-100 dark:from-error-900/20 dark:to-error-800/20 border-error-200 dark:border-error-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-error-600 dark:text-error-400">
                  Inactive Users
                </p>
                <p className="text-2xl font-bold text-error-900 dark:text-error-100">
                  {mockUsers.length - activeUsers}
                </p>
              </div>
              <div className="p-3 bg-error-600 rounded-xl">
                <User className="w-6 h-6 text-white" />
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterRole !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first user'
              }
            </p>
            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
              Add New User
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};