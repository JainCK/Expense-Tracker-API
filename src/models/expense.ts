import { Schema, model, Document, Types } from 'mongoose';

interface IExpense extends Document {
  userId: Types.ObjectId;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

const expenseSchema = new Schema<IExpense>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

const Expense = model<IExpense>('Expense', expenseSchema);
export default Expense;
