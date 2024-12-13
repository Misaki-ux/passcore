import { Password } from '../types/password';

// Encryption key (in a real app, this should be securely managed)
const STORAGE_KEY = 'passcore_passwords';

export const storage = {
  // Local Storage Operations
  local: {
    savePassword: async (password: Password): Promise<boolean> => {
      try {
        const existingData = localStorage.getItem(STORAGE_KEY);
        const passwords: Password[] = existingData ? JSON.parse(existingData) : [];
        
        // Check if password already exists
        const index = passwords.findIndex(p => p.id === password.id);
        if (index !== -1) {
          passwords[index] = password;
        } else {
          passwords.push(password);
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
        return true;
      } catch (error) {
        console.error('Error saving to local storage:', error);
        return false;
      }
    },

    getAllPasswords: (): Password[] => {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error('Error reading from local storage:', error);
        return [];
      }
    },

    removePassword: (id: string): boolean => {
      try {
        const passwords = storage.local.getAllPasswords();
        const filteredPasswords = passwords.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPasswords));
        return true;
      } catch (error) {
        console.error('Error removing from local storage:', error);
        return false;
      }
    }
  },

  // Cloud Storage Operations
  cloud: {
    savePassword: async (password: Password): Promise<boolean> => {
      try {
        // TODO: Implement actual cloud storage logic
        // This is a mock implementation
        console.log('Saving to cloud:', password);
        return new Promise(resolve => setTimeout(() => resolve(true), 1000));
      } catch (error) {
        console.error('Error saving to cloud:', error);
        return false;
      }
    },

    getAllPasswords: async (): Promise<Password[]> => {
      try {
        // TODO: Implement actual cloud storage logic
        return new Promise(resolve => setTimeout(() => resolve([]), 1000));
      } catch (error) {
        console.error('Error fetching from cloud:', error);
        return [];
      }
    },

    removePassword: async (id: string): Promise<boolean> => {
      try {
        // TODO: Implement actual cloud storage logic
        return new Promise(resolve => setTimeout(() => resolve(true), 1000));
      } catch (error) {
        console.error('Error removing from cloud:', error);
        return false;
      }
    }
  }
};
