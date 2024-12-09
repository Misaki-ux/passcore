import { User } from '../types';

let users: User[] = [
  {
    id: '1',
    email: 'admin@neopass.com',
    password: 'Admin@123',
    role: 'admin',
    twoFactorEnabled: true,
    biometricEnabled: false,
    status: 'active',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
  },
  {
    id: '2',
    email: 'user@neopass.com',
    password: 'User@123',
    role: 'user',
    twoFactorEnabled: false,
    biometricEnabled: false,
    status: 'active',
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date(),
  },
];

export const authenticate = (email: string, password: string): User | null => {
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (user) {
    user.lastLogin = new Date();
  }
  return user || null;
};

export const getAllUsers = (): User[] => {
  return users;
};

export const addNewUser = (userData: Omit<User, 'id'>): User => {
  const newUser = {
    ...userData,
    id: (users.length + 1).toString(),
    createdAt: new Date(),
    lastLogin: null,
  };
  users.push(newUser);
  return newUser;
};

export const updateUserData = (id: string, updates: Partial<User>): User => {
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) throw new Error('User not found');
  
  users[userIndex] = { ...users[userIndex], ...updates };
  return users[userIndex];
};

export const deleteUserData = (id: string): void => {
  users = users.filter(u => u.id !== id);
};