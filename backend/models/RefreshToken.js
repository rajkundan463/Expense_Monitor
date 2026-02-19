
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  token:String,
  expiresAt:Date
});

export default mongoose.model("RefreshToken",schema);
