import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerSchema } from "../validators/auth.validator.js";

export const register = async (req, res, next) => {
  try {
    registerSchema.parse(req.body);

    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashed });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "No token" });

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ message: "Invalid token" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccess = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res.json({ accessToken: newAccess });
  } catch (err) {
    next(err);
  }
};