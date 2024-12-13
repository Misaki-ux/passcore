import React from 'react';
import { SecuritySettings } from '../../components/settings/SecuritySettings';
import { SyncSettings } from '../../components/settings/SyncSettings';
import { PreferencesSettings } from '../../components/settings/PreferencesSettings';

export const Settings: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
      
      <div className="space-y-6">
        <SecuritySettings />
        <SyncSettings />
        <PreferencesSettings />
      </div>
    </div>
  );
};