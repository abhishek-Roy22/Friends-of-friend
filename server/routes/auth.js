import express from 'express';
import { login, logout, signup } from '../controllers/userController.js';

const userRouter = express.Router();

// signup route
userRouter.post('/register', signup);

// Login route
userRouter.post('/login', login);

// Logour route
userRouter.get('/logout', logout);

export default userRouter;
