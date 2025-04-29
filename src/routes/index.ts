import { Router } from 'express';
import userRoutes from './userRoutes';
import walletRoutes from './walletRoutes';
import investmentRoutes from './investmentRoutes';
import savingsRoutes from './savingsRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/wallets', walletRoutes);
router.use('/investments', investmentRoutes);
router.use('/savings', savingsRoutes);

export default router;