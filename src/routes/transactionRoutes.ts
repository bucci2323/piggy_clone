import { Router } from 'express';
import { createTransaction, getTransactions, getTransactionById, getTransactionsByWallet } from '../controllers/TransactionController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// all routes are protected
router.use(authenticateToken);

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransactionById);
router.get('/wallet/:walletId', getTransactionsByWallet);

export default router; 