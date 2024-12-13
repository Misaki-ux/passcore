import { create } from 'zustand';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true }); // Set loading to true when login starts
  
      // Replace this with a real API call
      const response = await mockAuthenticate(email, password);
  
      if (response.success && response.data) {
        set({
          isAuthenticated: true,
          user: {
            id: response.data.id, // Safely access id
            email: response.data.email, // Safely access email
          },
          isLoading: false, // Reset loading state
        });
      } else {
        set({ isLoading: false }); // Reset loading state if login fails
        throw new Error(response.message || 'Login failed'); // Provide a fallback message
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Login error:', errorMessage);
      set({ isLoading: false }); // Reset loading state on error
      throw error; // Optionally rethrow the error
    }
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));

// Mock authentication function (replace with actual API integration)
async function mockAuthenticate(email: string, password: string) {
  return new Promise<{ success: boolean; message?: string; data?: User }>((resolve) => {
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        resolve({
          success: true,
          data: { id: '1', email },
        });
      } else {
        resolve({ success: false, message: 'Invalid credentials' });
      }
    }, 1000); // Simulate API delay
  });
}
