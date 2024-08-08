import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import mongoose from 'mongoose';

const generateToken = (id: string | mongoose.Types.ObjectId) => {
  return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    const token = generateToken(user.id);
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err instanceof Error ? err.message : 'An unknown error occurred');
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err instanceof Error ? err.message : 'An unknown error occurred');
  }
};