import { generateToken } from '../config/generateToken.js';
import User from '../models/userSchema.js';

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // validate input
    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the user is already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    const newUser = await User.create({
      userName,
      email,
      password,
    });
    // create jwt token
    const token = generateToken(newUser);
    res.status(201).json({
      message: 'User Created Successfully',
      token,
      user: { userName, email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};
