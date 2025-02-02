import 'dotenv/config';
import express from 'express';
import connectToDb from './config/connection.js';
import userRouter from './routes/auth.js';
import { authMiddleware } from './config/middleware.js';
import friendsRouter from './routes/friends.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import User from './models/userSchema.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'https://friends-of-friend-ui.vercel.app',
    credentials: true, // Ensure cookies and headers are allowed
  })
);
app.use(express.json());
app.use(cookieParser());

// Define routes
app.get('/', (req, res) => {
  res.send('Server is running');
});
//Session Restoration route
app.get('/auth/restore-session', authMiddleware, async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId).select('userName email');
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
