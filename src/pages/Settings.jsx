import { Bell, Database, Globe, Lock, Palette, Save, Shield, User } from 'lucide-react';
import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export const Settings = () => {
  const [activeTab, setActiveTab] = React.useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data & Privacy', icon: Database },
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    defaultValue="EnergyHub Corp"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time Zone
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC+0 (GMT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Default Currency
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>USD ($)</option>
                    <option>INR (₹)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <Button variant="secondary">Change Avatar</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Hachiman"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Hikigaya"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="origairu@gmail.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Lock className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Email Notifications
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive alerts and updates via email
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Critical Alerts
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Immediate notifications for critical issues
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Weekly Reports
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Weekly summary of energy consumption
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Marketing Updates
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Product updates and feature announcements
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme & Display</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
               
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Compact Mode
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Show more content in less space
                    </p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Data Retention
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Energy data is retained for 2 years by default
                  </p>
                  <Button variant="secondary" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Export Data
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Download all your energy consumption data
                  </p>
                  <Button variant="secondary" size="sm">
                    Export
                  </Button>
                </div>
                <div className="p-4 bg-error-50 dark:bg-error-900/20 rounded-lg border border-error-200 dark:border-error-800">
                  <h4 className="font-medium text-error-900 dark:text-error-100 mb-2">
                    Delete Account
                  </h4>
                  <p className="text-sm text-error-600 dark:text-error-400 mb-3">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="error" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <TabContent />
          
          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <Button variant="primary" icon={<Save className="w-4 h-4" />}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};