import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  summary
} from "../controllers/expense.controller.js";

const router = express.Router();

router.use(auth);

router.post("/", createExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense);
router.put("/:id", updateExpense);
router.get("/summary", summary);

export default router;