import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = "sweetshopsecret";

// register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    // const user = new User({ name, email, password: hashed });
    const user = new User({ name, email, password: hashed, role: "admin" });

    await user.save();
    res.status(201).json({ message: "Registered" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "6h" });
   
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
























