import express from 'express';
import { signup } from '../controllers/userController.js';

const userRouter = express.Router();

// signup route
userRouter.post('/register', signup);

export default userRouter;
