import { Router } from 'express';
import { createWallet, getWallets, getWalletById } from '../controllers/WalletController';
import { authenticateToken } from '../middleware/auth';

const router = Router();


router.use(authenticateToken);


router.post('/', createWallet);
router.get('/', getWallets);
router.get('/:id', getWalletById);

export default router; 