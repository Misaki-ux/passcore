import { create } from 'zustand';

interface Preferences {
  theme: 'light' | 'dark' | 'system';
}

interface SettingsState {
  preferences: Preferences;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  preferences: {
    theme: 'system',
  },
}));