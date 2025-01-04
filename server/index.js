import 'dotenv/config';
import express from 'express';
import connectToDb from './config/connection.js';
import userRouter from './routes/auth.js';
import { authMiddleware } from './config/middleware.js';
import friendsRouter from './routes/friends.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
