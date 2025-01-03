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

export const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Validate input
    if (!userName || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate user & it's password
    const { token, user } = await User.matchPassword(userName, password);
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { userName: user.userName, email: user.email },
    });
  } catch (error) {}
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query; // Search term from the query
    if (!query) {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    const users = await User.find({
      userName: { $regex: query, $options: 'i' }, // case-sensitive match
    }).select('userName email'); // excludes sensitive information

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const sendFriendRequest = async (req, res) => {
  const { recipientId } = req.body;
  const senderId = req.user.id; // retrive from middleware
  try {
    if (senderId === recipientId) {
      return res
        .status(400)
        .json({ message: `You can't send a friend request to yourself` });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add friend request
    recipient.friendRequests.push(senderId);
    await recipient.save();

    res.status(200).json({ message: 'Friend request sent successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
