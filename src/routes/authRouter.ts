import { Router } from 'express';
import { authController } from '../controllers/authController';

export const router = Router();

router.post('/login', authController.login);
