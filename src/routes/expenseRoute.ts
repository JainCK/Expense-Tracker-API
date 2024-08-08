import { Request, Response } from 'express';
import Expense from '../models/expense';
import auth from '../middleware/auth';

interface AuthRequest extends Request {
  user?: any;
}

export const addExpense = async (req: AuthRequest, res: Response) => {
  const { category, amount, description, date } = req.body;
  try {
    const expense = new Expense({ userId: req.user?._id, category, amount, description, date });
    await expense.save();
    res.status(201).send(expense);
  } catch (err) {
    res.status(400).send(err instanceof Error ? err.message : 'An unknown error occurred');
  }
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  const { startDate, endDate, category } = req.query;
  const filter: any = { userId: req.user?._id };
  if (startDate) filter.date = { $gte: new Date(startDate as string) };
  if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate as string) };
  if (category) filter.category = category;

  try {
    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.send(expenses);
  } catch (err) {
    res.status(500).send(err instanceof Error ? err.message : 'An unknown error occurred');
  }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const expense = await Expense.findOneAndUpdate({ _id: id, userId: req.user?._id }, updates, { new: true });
    if (!expense) {
      return res.status(404).send({ error: 'Expense not found' });
    }
    res.send(expense);
  } catch (err) {
    res.status(400).send(err instanceof Error ? err.message : 'An unknown error occurred');
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user?._id });
    if (!expense) {
      return res.status(404).send({ error: 'Expense not found' });
    }
    res.send(expense);
  } catch (err) {
    res.status(500).send(err instanceof Error ? err.message : 'An unknown error occurred');
  }
};