import User from '../models/userSchema.js';

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
  const senderId = req.user.userId; // retrive from middleware
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

    // Check if the friend request already exists
    const existingRequest = recipient.friendRequests.find(
      (request) => request._id.toString() === senderId
    );

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent.' });
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

export const manageFriendRequest = async (req, res) => {
  const { senderId, action } = req.body;
  const recipientId = req.user.userId; // Retrieve from middleware

  try {
    // Validate inputs
    if (!senderId || !action) {
      return res
        .status(400)
        .json({ message: 'Sender ID and action are required.' });
    }

    // Fetch the recipient user from the database
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found.' });
    }

    // Locate the friend request object in the recipient's friendRequests array
    const friendRequest = recipient.friendRequests.find(
      (request) => request._id.toString() === senderId
    );

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    // Remove the friend request from the array
    recipient.friendRequests = recipient.friendRequests.filter(
      (request) => request._id.toString() !== senderId
    );

    if (action === 'accepted') {
      // Add sender to the recipient's friends list
      recipient.friends.push(senderId);

      // Add recipient to the sender's friends list
      const sender = await User.findById(senderId);
      if (!sender) {
        return res.status(404).json({ message: 'Sender user not found.' });
      }

      sender.friends.push(recipientId);
      await sender.save();
    } else if (action === 'rejected') {
      recipient.friendRequests = recipient.friendRequests.filter(
        (request) => request._id.toString() !== senderId
      );
      const sender = await User.findById(senderId);
      if (!sender) {
        return res.status(404).json({ message: 'Sender user not found.' });
      }
      await sender.save();
    }

    // Save the recipient user
    await recipient.save();

    res
      .status(200)
      .json({ message: `Friend request ${action}ed successfully.` });
  } catch (err) {
    console.error('Error managing friend request:', err.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

export const getFriendList = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate(
      'friends',
      'userName email'
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const recommendFriends = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendIds = user.friends.filter((friend) => friend._id.toString());

    const recommendations = await User.find({
      _id: { $nin: [...friendIds, userId] },
      friends: { $in: friendIds }, // Mutual friend
    }).select('userName email');

    res.status(200).json(recommendations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getFriendRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      'friendRequests.senderId',
      'userName email profilePicture'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendRequests = await Promise.all(
      user.friendRequests.map(async (request) => {
        const sender = await User.findById(request._id);
        return {
          id: request._id,
          status: request.status,
          sender,
        };
      })
    );

    res.status(200).json(friendRequests);
  } catch (err) {
    console.error('Error fetching friend requests:', err.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
