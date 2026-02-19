
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User",index:true},
  amount:Number,
  source:String,
  date:{type:Date,default:Date.now}
},{timestamps:true});

schema.index({user:1,date:-1});

export default mongoose.model("Income",schema);
