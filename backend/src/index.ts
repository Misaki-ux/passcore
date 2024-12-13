import express from 'express';
import cors from 'cors';
import passwordRoutes from './routes/passwords';
import authRoutes from './routes/passwords';
import './db/database';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/passwords', passwordRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
