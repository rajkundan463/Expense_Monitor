import Expense from "../models/Expense.js";
import mongoose from "mongoose";
import { expenseSchema } from "../validators/expense.validator.js";

export const createExpense = async (req, res, next) => {
  try {
    expenseSchema.parse(req.body);

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
    const { category, sort, page = 1, limit = 10 } = req.query;

    const query = { userId: req.user.id };
    if (category) query.category = category;

    const expenses = await Expense.find(query)
      .sort({ date: sort === "date_asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Expense.countDocuments(query);

    res.json({ expenses, total });
  } catch (err) {
    next(err);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    expenseSchema.parse(req.body);

    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const summary = async (req, res, next) => {
  try {
    const data = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]);

    res.json(data);
  } catch (err) {
    next(err);
  }
};