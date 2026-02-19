
import express from "express";
import {createExpense,getExpenses,deleteExpense} from "../controllers/expense.controller.js";
import {protect} from "../middlewares/auth.middleware.js";
const router=express.Router();

router.use(protect);
router.post("/",createExpense);
router.get("/",getExpenses);
router.delete("/:id",deleteExpense);

export default router;
