import express from 'express';
import { createSavingsPlan, addToSavings, withdrawFromSavings } from '../controller/savings.controller';
import { authenticateToken } from '../middleware/auth';
import { RouteHandler } from '../types/express';

const router = express.Router();

// Request validation middleware
const validateCreateSavingsPlan: RouteHandler = async (req, res, next) => {
  const { name, type, targetAmount, lockPeriod, autoSave, autoSaveAmount, autoSaveFrequency } = req.body;
  
  if (!name || !type) {
    res.status(400).json({ message: 'Name and type are required' });
    return;
  }

  if (type === 'SAFELOCK' && !lockPeriod) {
    res.status(400).json({ message: 'Lock period is required for Safelock savings' });
    return;
  }

  if (type === 'TARGET' && !targetAmount) {
    res.status(400).json({ message: 'Target amount is required for Target savings' });
    return;
  }

  if (autoSave && (!autoSaveAmount || !autoSaveFrequency)) {
    res.status(400).json({ message: 'Auto save amount and frequency are required when auto save is enabled' });
    return;
  }

  next();
};

const validateSavingsOperation: RouteHandler = async (req, res, next) => {
  const { amount, savingsPlanId } = req.body;

  if (!amount || amount <= 0) {
    res.status(400).json({ message: 'Amount must be greater than 0' });
    return;
  }

  if (!savingsPlanId) {
    res.status(400).json({ message: 'Savings plan ID is required' });
    return;
  }

  next();
};

// All routes require authentication
router.use(authenticateToken);

// Create a new savings plan
router.post('/create', validateCreateSavingsPlan, createSavingsPlan);

// Add money to savings plan
router.post('/deposit', validateSavingsOperation, addToSavings);

// Withdraw from savings plan
router.post('/withdraw', validateSavingsOperation, withdrawFromSavings);

export default router; 