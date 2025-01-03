import express from 'express';
import { login, signup } from '../controllers/userController.js';

const userRouter = express.Router();

// signup route
userRouter.post('/register', signup);

// Login route
userRouter.post('/login', login);

export default userRouter;
