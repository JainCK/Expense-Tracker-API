import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import authRoutes from './routes/authRoute'
import expenseRoute from './routes/expenseRoute'
import setupSwagger from './utils/swagger';

dotenv.config();

const app = express();


setupSwagger(app);


connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoute);


app.listen(3000, function () {
    console.log('server connected');
});