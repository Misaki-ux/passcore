import express from 'express';
import { localDb } from '../db/database';  // SQLite database
import { Pool } from 'pg';  // PostgreSQL database
import { v4 as uuidv4 } from 'uuid';

// Initialize PostgreSQL connection
const pool = new Pool({
  user: 'neondb_owner',
  host: 'ep-raspy-darkness-a23ahaz3-pooler.eu-central-1.aws.neon.tech',
  database: 'neondb',
  password: 'X4wrDSCKMNt6',
  port: 5432, // Default PostgreSQL port
  ssl: { rejectUnauthorized: false }, // Required for Neon DB
});

const router = express.Router();

// Here, db can be either localDb (SQLite) or pool (PostgreSQL) depending on your logic
const db = localDb;  // For local SQLite, use `localDb`, for PostgreSQL use `pool`

// Get all passwords for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    let passwords;
    if (db === localDb) {
      // SQLite Query
      passwords = db.prepare('SELECT * FROM passwords WHERE user_id = ?').all(userId);
    } else {
      // PostgreSQL Query
      const query = 'SELECT * FROM passwords WHERE user_id = $1';
      const result = await pool.query(query, [userId]);
      passwords = result.rows;
    }
    
    res.json(passwords);
  } catch (error) {
    console.error('Error fetching passwords:', error); // Log the error
    res.status(500).json({ error: 'Failed to fetch passwords' });
  }
});

// Create a new password
router.post('/', async (req, res) => {
  try {
    const { userId, title, username, password, url, notes } = req.body;
    const id = uuidv4();

    if (db === localDb) {
      // SQLite Insert
      const stmt = db.prepare(`
        INSERT INTO passwords (id, user_id, title, username, password, url, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(id, userId, title, username, password, url, notes);
    } else {
      // PostgreSQL Insert
      const query = `
        INSERT INTO passwords (id, user_id, title, username, password, url, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      await pool.query(query, [id, userId, title, username, password, url, notes]);
    }

    res.status(201).json({ id });
  } catch (error) {
    console.error('Error creating passwords:', error); // Log the error
    res.status(500).json({ error: 'Failed to create passwords' });
  }
});

// Update a password
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, username, password, url, notes } = req.body;

    if (db === localDb) {
      // SQLite Update
      const stmt = db.prepare(`
        UPDATE passwords
        SET title = ?, username = ?, password = ?, url = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      stmt.run(title, username, password, url, notes, id);
    } else {
      // PostgreSQL Update
      const query = `
        UPDATE passwords
        SET title = $1, username = $2, password = $3, url = $4, notes = $5, updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
      `;
      await pool.query(query, [title, username, password, url, notes, id]);
    }

    res.json({ message: 'Password updated' });
  } catch (error) {
    console.error('Error updating passwords:', error); // Log the error
    res.status(500).json({ error: 'Failed to update passwords' });
  }
});

// Delete a password
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (db === localDb) {
      // SQLite Delete
      db.prepare('DELETE FROM passwords WHERE id = ?').run(id);
    } else {
      // PostgreSQL Delete
      const query = 'DELETE FROM passwords WHERE id = $1';
      await pool.query(query, [id]);
    }

    res.json({ message: 'Password deleted' });
  } catch (error) {
    console.error('Error deleting passwords:', error); // Log the error
    res.status(500).json({ error: 'Failed to delete passwords' });
  }
});

// Sync passwords
router.post('/sync', async (req, res) => {
  try {
    const { userId } = req.body;

    if (db === localDb) {
      // SQLite Sync
      const stmt = db.prepare(`
        UPDATE passwords
        SET last_sync = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `);
      stmt.run(userId);
    } else {
      // PostgreSQL Sync
      const query = `
        UPDATE passwords
        SET last_sync = CURRENT_TIMESTAMP
        WHERE user_id = $1
      `;
      await pool.query(query, [userId]);
    }

    res.json({ message: 'Passwords synced', timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Error syncing passwords:', error); // Log the error
    res.status(500).json({ error: 'Failed to sync passwords' });
  }
});

export default router;
