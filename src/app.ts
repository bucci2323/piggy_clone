import express from 'express';
import savingsRoutes from './routes/savings.routes';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/savings', savingsRoutes);

// ... existing code ...

export default app; 