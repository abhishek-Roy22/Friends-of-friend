import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { generateToken } from '../config/generateToken.js';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    friendRequests: [
      {
        senderId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
          default: 'pending',
        },
      },
    ],
    interests: [String],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  // generate salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.static('matchPassword', async function (userName, password) {
  const user = await this.findOne({ userName });
  if (!user) {
    throw new Error('User not found');
  }
  const hashedPassword = user.password;

  const match = await bcrypt.compare(password, hashedPassword);
  if (!match) {
    throw new Error('Invalid Password');
  }
  // generate token
  const token = generateToken(user);
  return { token, user };
});

const User = model('User', userSchema);
export default User;
