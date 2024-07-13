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

//codbot
//iqKFLhe8004E4k0V

//mongotest
//K3cSkNZ1aAw8fXoW