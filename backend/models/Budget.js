
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User",unique:true},
  monthlyBudget:Number
});

export default mongoose.model("Budget",schema);
