export interface SyncSettings {
  autoSync: boolean;
  syncInterval: number; // in minutes
  lastSync?: Date;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordTimeout: number; // in minutes
  biometricEnabled: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultPasswordLength: number;
  defaultPasswordOptions: {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
}

export interface SettingsState {
  sync: SyncSettings;
  security: SecuritySettings;
  preferences: UserPreferences;
  isLoading: boolean;
}