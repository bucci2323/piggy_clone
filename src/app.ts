import express from 'express';
import cors from 'cors';
import savingsRoutes from './routes/savings.routes';
import { errorHandler } from './middleware/errorHandler';
import { Request, Response } from 'express';
import { requestLogger, errorLogger } from './middleware/logger';

const app = express();


import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// const logsDir = join(__dirname, '../logs');
// if (!existsSync(logsDir)) {
//   mkdirSync(logsDir);
// }


app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(requestLogger);

app.use('/api/savings', savingsRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorLogger);
app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;

// Start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} 