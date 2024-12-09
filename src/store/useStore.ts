import { create } from 'zustand';
import { Theme, User, AuthState } from '../types';
import { authenticate, getAllUsers, addNewUser, updateUserData, deleteUserData } from '../services/auth';

interface Store extends AuthState {
  theme: Theme;
}

export const useStore = create<Store>((set) => ({
  theme: {
    isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    toggle: () => set((state) => ({
      theme: { ...state.theme, isDark: !state.theme.isDark }
    })),
  },
  user: null,
  isAuthenticated: false,
  users: getAllUsers(),
  login: (email: string, password: string) => {
    const user = authenticate(email, password);
    if (user) {
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  addUser: (userData) => {
    const newUser = addNewUser(userData);
    set((state) => ({
      users: [...state.users, newUser]
    }));
  },
  updateUser: (id, updates) => {
    const updatedUser = updateUserData(id, updates);
    set((state) => ({
      users: state.users.map((user) => 
        user.id === id ? updatedUser : user
      )
    }));
  },
  deleteUser: (id) => {
    deleteUserData(id);
    set((state) => ({
      users: state.users.filter((user) => user.id !== id)
    }));
  },
}));