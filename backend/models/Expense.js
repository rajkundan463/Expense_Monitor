import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, index: true },
  description: { type: String },
  date: { type: Date, required: true, index: true },
  idempotencyKey: { type: String, unique: true }
}, { timestamps: true });

expenseSchema.index({ userId: 1, date: -1 });

export default mongoose.model("Expense", expenseSchema);