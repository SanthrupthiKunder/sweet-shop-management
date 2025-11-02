// testApp.js (place at project root)
import express from "express";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import sweetsRoutes from "./routes/sweets.js";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

// connect test DB (use test DB)
connectDB(); // ensure db.js uses env NODE_ENV=test to pick test DB (see note)

export default app;
