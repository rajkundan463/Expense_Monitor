
import express from "express";
import {getAllUsers,getAllExpenses,deleteAnyExpense,adminAnalytics} from "../controllers/admin.controller.js";
import {protect} from "../middlewares/auth.middleware.js";
import {restrictTo} from "../middlewares/role.middleware.js";

const router=express.Router();

router.use(protect,restrictTo("admin"));

router.get("/users",getAllUsers);
router.get("/expenses",getAllExpenses);
router.delete("/expenses/:id",deleteAnyExpense);
router.get("/analytics",adminAnalytics);

export default router;
