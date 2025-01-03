import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT} `);
});
