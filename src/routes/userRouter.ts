import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

export const router = Router();

router.post('/users', authenticate, userController.createUser);
router.get('/users', authenticate, userController.getUsers);
router.patch('/users/:userId', authenticate, userController.updateUser);
