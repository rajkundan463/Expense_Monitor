
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";

export const monthlyExpense = (user)=>
  Expense.aggregate([
    {$match:{user}},
    {$group:{_id:{$month:"$date"},total:{$sum:"$amount"}}},
    {$sort:{_id:1}}
  ]);

export const monthlyIncome = (user)=>
  Income.aggregate([
    {$match:{user}},
    {$group:{_id:{$month:"$date"},total:{$sum:"$amount"}}},
    {$sort:{_id:1}}
  ]);
