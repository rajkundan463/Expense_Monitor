
import User from "../models/User.js";
import Expense from "../models/Expense.js";

export const getAllUsers = async(req,res)=>{
  const users=await User.find();
  res.json(users);
};

export const getAllExpenses = async(req,res)=>{
  const exp=await Expense.find();
  res.json(exp);
};

export const deleteAnyExpense = async(req,res)=>{
  await Expense.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
};

export const adminAnalytics = async(req,res)=>{
  const users=await User.countDocuments();
  const revenue=await Expense.aggregate([
    {$group:{_id:null,total:{$sum:"$amount"}}}
  ]);
  res.json({totalUsers:users,totalRevenue:revenue[0]?.total||0});
};
