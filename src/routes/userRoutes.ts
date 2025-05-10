import { Router } from 'express';
import { getProfile, updateKYC } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Protected routes
router.use(authenticateToken);
router.get('/profile', getProfile);
router.put('/kyc', updateKYC);

export default router; 