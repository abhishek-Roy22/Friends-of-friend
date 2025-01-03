import { connect } from 'mongoose';

const connectToDb = async (url) => {
  try {
    await connect(url);
  } catch (error) {
    throw new Error('Something wrong with connection string');
  }
};

export default connectToDb;
