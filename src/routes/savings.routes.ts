import express from 'express';
import { createSavingsPlan, addToSavings, withdrawFromSavings } from '../controller/savings.controller';
import { authenticateToken } from '../middleware/auth'; // You'll need to implement this

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Create a new savings plan
router.post('/create', createSavingsPlan);

// Add money to savings plan
router.post('/deposit', addToSavings);

// Withdraw from savings plan
router.post('/withdraw', withdrawFromSavings);

export default router; 