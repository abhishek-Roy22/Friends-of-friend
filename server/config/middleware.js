import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};

export { authMiddleware };
