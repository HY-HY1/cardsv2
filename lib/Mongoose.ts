import mongoose from 'mongoose';

let isConnected = false;

export const mongooseConnect = async () => {
  console.log("Connecting To DB")

  if (isConnected) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI not defined in environment variables');
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('✅ MongoDB connected');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};
