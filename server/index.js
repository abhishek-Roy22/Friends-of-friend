import 'dotenv/config';
import express from 'express';
import connectToDb from './config/connection.js';
import userRouter from './routes/auth.js';
import { authMiddleware } from './config/middleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(authMiddleware); // Apply middleware globally for all routes

// Define routes
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use('/auth', userRouter);

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
