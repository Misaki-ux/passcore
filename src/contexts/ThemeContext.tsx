import React, { createContext, useContext, useEffect } from 'react';
import { useSettingsStore } from '../store/settingsStore';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { preferences } = useSettingsStore();

  const setTheme = (theme: Theme) => {
    useSettingsStore.setState(state => ({
      ...state,
      preferences: {
        ...state.preferences,
        theme
      }
    }));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = preferences.theme === 'system' ? systemTheme : preferences.theme;

    root.classList.remove('light', 'dark');
    root.classList.add(activeTheme);
  }, [preferences.theme]);

  return (
    <ThemeContext.Provider value={{ theme: preferences.theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};