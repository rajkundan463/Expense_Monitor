
import express from "express";
import {setBudget,getBudgetStatus} from "../controllers/budget.controller.js";
import {protect} from "../middlewares/auth.middleware.js";
const router=express.Router();

router.use(protect);
router.post("/",setBudget);
router.get("/status",getBudgetStatus);

export default router;
