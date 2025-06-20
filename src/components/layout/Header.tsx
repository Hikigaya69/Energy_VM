import { Bell, LogOut, Menu, Search, Settings, User } from 'lucide-react';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16">
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search meters, alerts..."
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-700 transition-colors duration-200 w-64 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
          </Button>

          {/* Profile menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <img
                src={user?.avatar || 'https://www.google.com/imgres?q=hikigaya%20profile%20pic&imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fyahari%2Fimages%2F2%2F21%2FPortal-hachiman.png%2Frevision%2Flatest%2Fscale-to-width%2F360%3Fcb%3D20141119202536&imgrefurl=https%3A%2F%2Foregairu.fandom.com%2Fwiki%2FHachiman_Hikigaya&docid=foquORfz5AEiQM&tbnid=nI2i7O18dmakeM&vet=12ahUKEwi-utuJ5fyNAxV8V2wGHaz1G-oQM3oECHcQAA..i&w=360&h=560&hcb=2&ved=2ahUKEwi-utuJ5fyNAxV8V2wGHaz1G-oQM3oECHcQAA'}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role}
                </p>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </a>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close menus */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};