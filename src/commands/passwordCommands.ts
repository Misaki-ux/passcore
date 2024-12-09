import { passwordVault } from '../services/passwordVault';
import { TableFormatter } from '../utils/tableFormatter';

export class PasswordCommands {
  static add(site: string, username: string, password: string): string {
    try {
      const entry = passwordVault.add(site, username, password);
      return `✓ Added credentials for ${site}`;
    } catch (error) {
      return `✗ Error adding credentials: ${error.message}`;
    }
  }

  static remove(site: string): string {
    const success = passwordVault.remove(site);
    return success
      ? `✓ Removed credentials for ${site}`
      : `✗ No credentials found for ${site}`;
  }

  static get(site: string): string {
    const entry = passwordVault.get(site);
    if (!entry) {
      return `✗ No credentials found for ${site}`;
    }

    return TableFormatter.formatTable([entry], {
      columns: {
        title: { width: 30, align: 'left' },
        username: { width: 30, align: 'left' },
        password: { width: 30, align: 'left' },
        dateAdded: { width: 20, align: 'right' }
      }
    });
  }

  static list(): string {
    const entries = passwordVault.list();
    if (entries.length === 0) {
      return 'No stored credentials found.';
    }

    return TableFormatter.formatTable(
      entries.map(entry => ({
        ...entry,
        dateAdded: entry.dateAdded.toLocaleString()
      })),
      {
        columns: {
          title: { width: 30, align: 'left' },
          username: { width: 30, align: 'left' },
          password: { width: 30, align: 'left' },
          dateAdded: { width: 20, align: 'right' }
        }
      }
    );
  }

  static generate(length: number = 16): string {
    try {
      const password = passwordVault.generatePassword(length);
      return `Generated password: ${password}`;
    } catch (error) {
      return `✗ Error generating password: ${error.message}`;
    }
  }

  static clear(): string {
    passwordVault.clear();
    return '✓ All stored credentials have been removed';
  }

  static parseCommand(input: string): string {
    const [command, ...args] = input.trim().split(' ');

    switch (command.toLowerCase()) {
      case '/add':
        if (args.length !== 3) {
          return '✗ Usage: /add [site] [username] [password]';
        }
        return this.add(args[0], args[1], args[2]);

      case '/remove':
        if (args.length !== 1) {
          return '✗ Usage: /remove [site]';
        }
        return this.remove(args[0]);

      case '/get':
        if (args.length !== 1) {
          return '✗ Usage: /get [site]';
        }
        return this.get(args[0]);

      case '/list':
        return this.list();

      case '/generate':
        const length = args.length > 0 ? parseInt(args[0], 10) : undefined;
        return this.generate(length);

      case '/clear':
        return this.clear();

      default:
        return `✗ Unknown command: ${command}`;
    }
  }
}