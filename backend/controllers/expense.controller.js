
import Expense from "../models/Expense.js";

export const createExpense = async(req,res)=>{
  const {amount,category,description,idempotencyKey}=req.body;
  const existing=await Expense.findOne({idempotencyKey});
  if(existing) return res.json(existing);

  const exp=await Expense.create({
    user:req.user.id,amount,category,description,idempotencyKey
  });
  res.json(exp);
};

export const getExpenses = async(req,res)=>{
  const {page=1,limit=10,category,sort}=req.query;
  const q={user:req.user.id};
  if(category) q.category=category;

  const data=await Expense.find(q)
   .sort(sort==="date_asc"?{date:1}:{date:-1})
   .skip((page-1)*limit)
   .limit(Number(limit));

  const total=await Expense.countDocuments(q);

  const sum=await Expense.aggregate([
    {$match:q},
    {$group:{_id:null,total:{$sum:"$amount"}}}
  ]);

  res.json({data,total,totalSpending:sum[0]?.total||0});
};

export const deleteExpense = async(req,res)=>{
  await Expense.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
};
