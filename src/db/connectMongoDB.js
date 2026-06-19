import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  const { MONGO_URL } = process.env;

  try {
    if (!MONGO_URL) {
      throw new Error('MONGO_URL is not defined');
    }

    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connection established successfully');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
