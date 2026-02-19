
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User",index:true},
  amount:Number,
  category:{type:String,index:true},
  description:String,
  date:{type:Date,default:Date.now},
  idempotencyKey:{type:String,unique:true}
},{timestamps:true});

schema.index({user:1,date:-1});

export default mongoose.model("Expense",schema);
