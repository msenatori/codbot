import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.URI_MONGO || '';

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};