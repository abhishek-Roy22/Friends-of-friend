import 'dotenv/config';
import express from 'express';
import connectToDb from './config/connection.js';
import userRouter from './routes/auth.js';
import { authMiddleware } from './config/middleware.js';
import friendsRouter from './routes/friends.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import User from './models/userSchema.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Define routes
app.get('/', (req, res) => {
  res.send('Server is running');
});
//Session Restoration route
app.get('/auth/restore-session', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRRET_KEY);
    const user = await User.findById(payload.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User is not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

app.use('/auth', userRouter);
app.use('/friends', authMiddleware, friendsRouter);

// Connecting to db & Creating server
connectToDb(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT} & connected to db`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
