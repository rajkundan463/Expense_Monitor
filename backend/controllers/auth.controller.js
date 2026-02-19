
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import { generateAccessToken,generateRefreshToken } from "../services/token.service.js";

export const register = async(req,res)=>{
  const {name,email,password}=req.body;
  const hash=await bcrypt.hash(password,10);
  await User.create({name,email,password:hash});
  res.json({message:"Registered"});
};

export const login = async(req,res)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email});
  if(!user) return res.status(400).json({message:"Invalid"});
  const ok=await bcrypt.compare(password,user.password);
  if(!ok) return res.status(400).json({message:"Invalid"});

  const access=generateAccessToken(user);
  const refresh=generateRefreshToken(user);

  await RefreshToken.create({
    user:user._id,
    token:refresh,
    expiresAt:new Date(Date.now()+7*24*60*60*1000)
  });

  res.json({accessToken:access,refreshToken:refresh,role:user.role});
};

export const refreshToken = async(req,res)=>{
  const {refreshToken}=req.body;
  const stored=await RefreshToken.findOne({token:refreshToken});
  if(!stored) return res.status(403).json({message:"Invalid"});
  const access=generateAccessToken({ _id:stored.user, role:"user"});
  res.json({accessToken:access});
};

export const logout = async(req,res)=>{
  await RefreshToken.deleteMany({user:req.user.id});
  res.json({message:"Logged out"});
};
