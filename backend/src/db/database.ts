import Database from 'better-sqlite3';
import path from 'path';
import { Pool } from 'pg';
import crypto from 'crypto';

// Local SQLite Database
const localDb = new Database(path.join(__dirname, '../../data/passwords.db'), {
    verbose: console.log,
});

// Neon DB connection details
const pool = new Pool({
    user: 'neondb_owner',
    host: 'ep-raspy-darkness-a23ahaz3-pooler.eu-central-1.aws.neon.tech',
    database: 'neondb',
    password: 'X4wrDSCKMNt6',
    port: 5432, // Default PostgreSQL port
    ssl: { rejectUnauthorized: false }, // Required for Neon DB
});

// Encryption function (AES-256-CBC with IV)
const encryptData = (data: string): string => {
    try {
        const secretKey = process.env.ENCRYPTION_KEY || 'default-placeholder-key';
        if (secretKey.length !== 32) {
            throw new Error('Encryption key must be 32 bytes long for AES-256.');
        }

        const iv = crypto.randomBytes(16); // Generate a random 16-byte IV
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Return IV along with the encrypted data
        return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
        console.error('Encryption failed:', error);
        throw new Error('Encryption process failed.');
    }
};

// Decryption function (AES-256-CBC with IV)
const decryptData = (encryptedData: string): string => {
    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from('your-secret-key'), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

// Example user data
const users = [
    {
        id: '1',
        email: 'admin@neopass.com',
        password: 'Admin@123',
        role: 'admin',
        twoFactorEnabled: true,
        biometricEnabled: false,
        status: 'active',
        createdAt: '2024-01-01',
        lastLogin: new Date().toISOString(),
    },
    {
        id: '2',
        email: 'user@neopass.com',
        password: 'User@123',
        role: 'user',
        twoFactorEnabled: false,
        biometricEnabled: false,
        status: 'active',
        createdAt: '2024-02-01',
        lastLogin: new Date().toISOString(),
    }
];
interface User {
    id: string;
    email: string;
    password: string; // Add password field for decrypted password
    // Add other fields if necessary
  }
// Function to get user and decrypt password
const getUser = async (userId: string): Promise<User | null> => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const res = await pool.query(query, [userId]);

    if (res.rows.length > 0) {
        const user = res.rows[0];
        const decryptedPassword = decryptData(user.password);  // Decrypt the password
        
        // Return the user object with decrypted password
        return {
          ...user,
          password: decryptedPassword,  // Decrypted password
        };
      } else {
        console.log('User not found');
        return null; // Return null if user is not found
      }
    };

// Fetch and decrypt user data
getUser('1').then(() => pool.end());

// Initialize local database tables
const initLocalDb = () => {
    try {
        localDb.exec(`
            CREATE TABLE IF NOT EXISTS passwords (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                url TEXT,
                notes TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                synced BOOLEAN DEFAULT 0 -- 0: Not synced, 1: Synced
            );
        `);
        console.log('Local database initialized');
    } catch (error) {
        console.error('Error initializing local database:', error);
    }
};

// Initialize cloud database tables
const initCloudDb = async () => {
    try {
        for (const user of users) {
            const encryptedPassword = encryptData(user.password);  // Encrypt password
            const query = `
                INSERT INTO users (id, email, password, role, twoFactorEnabled, biometricEnabled, status, createdAt, lastLogin)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `;
            const values = [
                user.id,
                user.email,
                encryptedPassword,
                user.role,
                user.twoFactorEnabled,
                user.biometricEnabled,
                user.status,
                user.createdAt,
                user.lastLogin
            ];

            await pool.query(query, values);
        }
        console.log('User data inserted successfully!');
    } catch (error) {
        console.error('Error inserting user data into cloud database:', error);
    }
};

// Initialize both databases
initLocalDb();
initCloudDb().catch(console.error);

export { localDb, pool };
