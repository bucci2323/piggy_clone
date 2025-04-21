import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerSchema, loginSchema } from '../validations/auth.validation';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.post('/register', registerSchema, validateRequest, register);
router.post('/login', loginSchema, validateRequest, login);

export default router;
