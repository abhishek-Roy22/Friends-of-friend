import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const userId = user.id;
  const token = jwt.sign({ userId }, process.env.SECRRET_KEY, {
    expiresIn: '1h',
  });

  return token;
};
