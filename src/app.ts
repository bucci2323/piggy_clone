import express from 'express';
import cors from 'cors';
import savingsRoutes from './routes/savings.routes';
import { errorHandler } from './middleware/errorHandler';
import { Request, Response } from 'express';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/savings', savingsRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app; 