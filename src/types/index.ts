export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  createdAt?: Date;
  lastLogin?: Date;
  status: 'active' | 'suspended' | 'pending';
  mfaSecret?: string | null;
}

export interface PasswordEntry {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  category: string;
  tags: string[];
  strength: number;
  lastModified: Date;
  notes?: string;
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
}