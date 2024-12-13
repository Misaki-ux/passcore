import React, { useState } from 'react';
import { Shield, Lock, Fingerprint, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

export const SecuritySettings: React.FC = () => {
  const [settings, setSettings] = useState({
    twoFactor: false,
    biometric: true,
    autoLock: '15',
    masterPasswordTimeout: '30',
  });

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
          <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('twoFactor')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.twoFactor ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.twoFactor ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Biometric Authentication */}
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Fingerprint className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Biometric Authentication
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Use fingerprint or face recognition to unlock
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('biometric')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.biometric ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.biometric ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Auto-Lock Timeout */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-grow">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Auto-Lock Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Auto-lock after inactivity
                </label>
                <select
                  name="autoLock"
                  value={settings.autoLock}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="5">5 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Master password re-prompt
                </label>
                <select
                  name="masterPasswordTimeout"
                  value={settings.masterPasswordTimeout}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};