import express from "express";
import { createExpense, getExpenses } from "../controllers/expense.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(auth);
router.post("/", createExpense);
router.get("/", getExpenses);
export default router;