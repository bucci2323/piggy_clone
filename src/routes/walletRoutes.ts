import { Router } from 'express';
import { WalletController } from '../controllers/walletController';
// import { authMiddleware } from '../middleware/auth'; // Will be implemented later

const router = Router();
const walletController = new WalletController();

// Protected routes will require authentication
router.post('/', walletController.createWallet);
router.post('/:id/deposit', walletController.deposit);
router.get('/', walletController.getWallets);
router.get('/:id', walletController.getWallet);
router.post('/:id/withdraw', walletController.withdraw);
router.get('/:id/transactions', walletController.getWalletTransactions);

export default router;