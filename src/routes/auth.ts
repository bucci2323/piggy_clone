import { Router } from 'express';
import { register, login, getProfile, updateKYC } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.put('/kyc', authenticateToken, updateKYC);

export default router; 