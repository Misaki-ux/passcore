import React, { useState } from 'react';
import { Cloud, CloudOff, RefreshCw, Database } from 'lucide-react';
import { Button } from '../ui/Button';

export const SyncSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    autoSync: true,
    syncInterval: '15',
    lastSync: new Date().toISOString(),
    syncEnabled: true
  });

  const [isSyncing, setIsSyncing] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSettings(prev => ({
      ...prev,
      lastSync: new Date().toISOString()
    }));
    setIsSyncing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
          <Cloud className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sync Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Cloud Sync Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {settings.syncEnabled ? (
                <Cloud className="h-5 w-5 text-gray-400" />
              ) : (
                <CloudOff className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Cloud Sync
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {settings.syncEnabled 
                  ? 'Your passwords are being synced across devices' 
                  : 'Enable to sync passwords across devices'}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('syncEnabled')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.syncEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.syncEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {settings.syncEnabled && (
          <>
            {/* Auto Sync */}
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <RefreshCw className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Automatic Sync
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automatically sync changes
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('autoSync')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoSync ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoSync ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Sync Interval */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Database className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Sync Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Sync interval
                    </label>
                    <select
                      name="syncInterval"
                      value={settings.syncInterval}
                      onChange={handleChange}
                      disabled={!settings.autoSync}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      <option value="5">Every 5 minutes</option>
                      <option value="15">Every 15 minutes</option>
                      <option value="30">Every 30 minutes</option>
                      <option value="60">Every hour</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Last synced: {new Date(settings.lastSync).toLocaleString()}
                    </p>
                    <Button
                      onClick={handleManualSync}
                      disabled={isSyncing}
                      className="inline-flex items-center space-x-2 text-sm"
                    >
                      {isSyncing ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Syncing...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4" />
                          <span>Sync Now</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};