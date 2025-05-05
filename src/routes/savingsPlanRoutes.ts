import { Router } from 'express';
import { createPlan, getPlans, getPlanById, updatePlan, deletePlan } from '../controllers/SavingsPlanController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes are protected
router.use(authenticateToken);

router.post('/', createPlan);
router.get('/', getPlans);
router.get('/:id', getPlanById);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

export default router; 