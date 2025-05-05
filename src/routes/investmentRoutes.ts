import { Router } from 'express';
import { createInvestment, getInvestments, getInvestmentById, updateInvestment, deleteInvestment } from '../controllers/InvestmentController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes are protected
router.use(authenticateToken);

router.post('/', createInvestment);
router.get('/', getInvestments);
router.get('/:id', getInvestmentById);
router.put('/:id', updateInvestment);
router.delete('/:id', deleteInvestment);

export default router; 