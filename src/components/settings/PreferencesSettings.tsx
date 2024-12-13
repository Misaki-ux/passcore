import React, { useState } from 'react';
import { Settings, Moon, Sun, Globe, Bell } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';


export const PreferencesSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    language: 'en',
    notifications: {
      passwordExpiry: true,
      securityAlerts: true,
      updates: false
    },
    defaultView: 'grid'
  });

  const handleNotificationToggle = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
          <Settings className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preferences</h2>
      </div>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Theme
          </h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                theme === 'light'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Sun className="h-5 w-5" />
              <span>Light</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Moon className="h-5 w-5" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Language
            </h3>
          </div>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
          </select>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Notification Preferences
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Password Expiry Alerts
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified when passwords are about to expire
                </p>
              </div>
              <button
                onClick={() => handleNotificationToggle('passwordExpiry')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.passwordExpiry ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.passwordExpiry ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Security Alerts
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified about important security events
                </p>
              </div>
              <button
                onClick={() => handleNotificationToggle('securityAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.securityAlerts ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  App Updates
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified about new features and updates
                </p>
              </div>
              <button
                onClick={() => handleNotificationToggle('updates')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.updates ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.updates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Default View */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Default Password View
          </h3>
          <select
            name="defaultView"
            value={settings.defaultView}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="grid">Grid View</option>
            <option value="list">List View</option>
          </select>
        </div>
      </div>
    </div>
  );
};