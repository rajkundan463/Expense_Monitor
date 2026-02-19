
import Income from "../models/Income.js";

export const addIncome = async(req,res)=>{
  const inc=await Income.create({...req.body,user:req.user.id});
  res.json(inc);
};

export const getIncome = async(req,res)=>{
  const data=await Income.find({user:req.user.id});
  res.json(data);
};

export const deleteIncome = async(req,res)=>{
  await Income.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
};
