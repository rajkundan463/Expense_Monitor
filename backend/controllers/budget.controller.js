
import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

export const setBudget = async(req,res)=>{
  const {monthlyBudget}=req.body;
  await Budget.findOneAndUpdate(
    {user:req.user.id},
    {monthlyBudget},
    {upsert:true}
  );
  res.json({message:"Budget Set"});
};

export const getBudgetStatus = async(req,res)=>{
  const budget=await Budget.findOne({user:req.user.id});
  const spending=await Expense.aggregate([
    {$match:{user:req.user.id}},
    {$group:{_id:null,total:{$sum:"$amount"}}}
  ]);
  const spent=spending[0]?.total||0;
  const limit=budget?.monthlyBudget||0;

  const percent=limit? (spent/limit)*100 : 0;

  res.json({
    spent,limit,percent,
    warning: percent>=80 && percent<100,
    alert: percent>=100
  });
};
