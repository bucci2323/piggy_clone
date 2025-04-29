import { Router } from 'express';
import { InvestmentController } from '../controllers/investmentController';

const router = Router();
const investmentController = new InvestmentController();

router.post('/', investmentController.createInvestment);
router.get('/', investmentController.getInvestments);
router.get('/:id', investmentController.getInvestment);
router.post('/:id/liquidate', investmentController.liquidateInvestment);
router.get('/plans', investmentController.getInvestmentPlans);

export default router;