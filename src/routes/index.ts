import { Router } from 'express';
import authRoutes from './authRoutes';
import walletRoutes from './walletRoutes';
import savingsPlanRoutes from './savingsPlanRoutes';
import investmentRoutes from './investmentRoutes';
import transactionRoutes from './transactionRoutes';
import userRoutes from './userRoutes';

const router = Router();


router.use('/auth', authRoutes);
router.use('/wallets', walletRoutes);
router.use('/savings-plans', savingsPlanRoutes);
router.use('/investments', investmentRoutes);
router.use('/transactions', transactionRoutes);
router.use('/users', userRoutes);

export default router; 