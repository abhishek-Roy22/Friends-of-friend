import express from 'express';
import {
  getFriendList,
  getFriendRequest,
  manageFriendRequest,
  recommendFriends,
  searchUsers,
  sendFriendRequest,
} from '../controllers/friendController.js';

const friendsRouter = express.Router();

// Route
friendsRouter.get('/search', searchUsers);
friendsRouter.post('/send-request', sendFriendRequest);
friendsRouter.post('/manage-request', manageFriendRequest);
friendsRouter.get('/friends', getFriendList);
friendsRouter.get('/recommendations', recommendFriends);
friendsRouter.get('/friend-requests', getFriendRequest);

export default friendsRouter;
