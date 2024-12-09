import { v4 as uuidv4 } from 'uuid';
import { PasswordEntry } from '../types';
import { generatePassword } from '../utils/passwordUtils';

interface VaultEntry extends PasswordEntry {
  dateAdded: Date;
}

class PasswordVault {
  private entries: Map<string, VaultEntry>;

  constructor() {
    this.entries = new Map();
  }

  add(site: string, username: string, password: string): VaultEntry {
    const entry: VaultEntry = {
      id: uuidv4(),
      title: site,
      username,
      password,
      dateAdded: new Date(),
      category: 'Uncategorized',
      tags: [],
      strength: 0,
      lastModified: new Date()
    };
    this.entries.set(site.toLowerCase(), entry);
    return entry;
  }

  remove(site: string): boolean {
    return this.entries.delete(site.toLowerCase());
  }

  get(site: string): VaultEntry | undefined {
    return this.entries.get(site.toLowerCase());
  }

  list(): VaultEntry[] {
    return Array.from(this.entries.values());
  }

  clear(): void {
    this.entries.clear();
  }

  generatePassword(length: number = 16): string {
    return generatePassword(length, {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true
    });
  }
}

// Singleton instance
export const passwordVault = new PasswordVault();