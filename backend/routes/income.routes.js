
import express from "express";
import {addIncome,getIncome,deleteIncome} from "../controllers/income.controller.js";
import {protect} from "../middlewares/auth.middleware.js";
const router=express.Router();

router.use(protect);
router.post("/",addIncome);
router.get("/",getIncome);
router.delete("/:id",deleteIncome);

export default router;
