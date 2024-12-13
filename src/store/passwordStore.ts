import { create } from 'zustand';
import type { PasswordState } from '../types/password';

// The type for the PasswordState
interface Password {
  id: string;
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  lastSync: string;
}

export const usePasswordStore = create<PasswordState>((set, get) => ({
  entries: [],
  isLoading: false,
  error: null,
  syncStatus: {
    lastSync: null,
    isSyncing: false,
    error: null,
  },
  
  // Load passwords from the backend or mock data
  loadPasswords: async () => {
    set({ isLoading: true });
    try {
      // Make an API call to fetch passwords
      const response = await fetch('/api/passwords');
      const data = await response.json();
      
      set({ entries: data, isLoading: false });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown-1 error occurred';
      set({ error: errorMessage, isLoading: false });
    }
  },
  
  // Sync passwords with backend or mock cloud sync
  syncPasswords: async () => {
    const state = get();
    if (state.syncStatus.isSyncing) return;

    set({ syncStatus: { ...state.syncStatus, isSyncing: true, error: null } });
    try {
      // Simulate cloud sync, or make an API call to sync
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate sync delay

      // Update last sync time for all passwords
      const updatedEntries = state.entries.map(entry => ({
        ...entry,
        lastSync: new Date().toISOString(),
      }));

      set({
        entries: updatedEntries,
        syncStatus: {
          lastSync: new Date().toISOString(),
          isSyncing: false,
          error: null,
        },
      });
    } catch (error: unknown) {
      // Check if the error is an instance of Error to safely access the message property
      const errorMessage = error instanceof Error ? error.message : 'Failed to sync passwords';
      set((state) => ({
        syncStatus: {
          ...state.syncStatus,
          isSyncing: false,
          error: errorMessage, // Use the dynamic error message if available
        },
      }));
    }
  },
  
  // Additional method to add a password
  addPassword: async (password: Password) => {
    const state = get();
    try {
      // Send the password to the backend API
      const response = await fetch('/api/passwords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(password),
      });

      if (response.ok) {
        const newPassword = await response.json();
        set({ entries: [...state.entries, newPassword] });
      } else {
        throw new Error('Failed to add password');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add password';
      set({ error: errorMessage });
    }
  },

  // Method to delete a password
  deletePassword: async (id: string) => {
    const state = get();
    try {
      const response = await fetch(`/api/passwords/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedEntries = state.entries.filter((entry) => entry.id !== id);
        set({ entries: updatedEntries });
      } else {
        throw new Error('Failed to delete password');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete password';
      set({ error: errorMessage });
    }
  },
}));
