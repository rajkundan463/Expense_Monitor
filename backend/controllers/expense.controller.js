import Expense from "../models/Expense.js";

export const createExpense = async (req, res, next) => {
  try {
    const key = req.headers["idempotency-key"];
    if (key) {
      const existing = await Expense.findOne({ idempotencyKey: key });
      if (existing) return res.json(existing);
    }

    const expense = await Expense.create({
      ...req.body,
      userId: req.user.id,
      idempotencyKey: key
    });

    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

export const getExpenses = async (req, res, next) => {
  try {
    const query = { userId: req.user.id };
    if (req.query.category) query.category = req.query.category;

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    next(err);
  }
};