import { Router } from 'express';
import { SavingsController } from '../controllers/savingsController';

const router = Router();
const savingsController = new SavingsController();

router.post('/plans', savingsController.createSavingsPlan);
router.get('/plans', savingsController.getSavingsPlans);
router.get('/plans/:id', savingsController.getSavingsPlan);
router.post('/plans/:id/deposit', savingsController.depositToSavings);
router.post('/plans/:id/withdraw', savingsController.withdrawFromSavings);
router.get('/plans/:id/transactions', savingsController.getSavingsTransactions);

export default router;