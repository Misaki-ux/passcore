export interface PasswordEntry {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  lastSync: string;
}

export interface SyncStatus {
  lastSync: string | null;
  isSyncing: boolean;
  error: string | null;
}

export interface PasswordState {
  entries: PasswordEntry[];
  isLoading: boolean;
  error: string | null;
  syncStatus: SyncStatus;
  loadPasswords: () => Promise<void>;
  syncPasswords: () => Promise<void>;
}