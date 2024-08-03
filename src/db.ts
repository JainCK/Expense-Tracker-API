import mongoose, { Schema } from 'mongoose';
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
})();


const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model('User', userSchema);

export { User };