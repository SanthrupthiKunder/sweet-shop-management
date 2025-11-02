// import express from "express";
// import cors from "cors";
// import connectDB from "./db.js";
// import authRoutes from "./routes/auth.js";
// import sweetsRoutes from "./routes/sweets.js";

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// connectDB();

// app.use("/api/auth", authRoutes);
// app.use("/api/sweets", sweetsRoutes);

// app.get("/", (req, res) => res.send("🍬 Sweet Shop API running!"));

// app.use((err, req, res, next) => {
//   console.error("Error:", err);
//   res.status(500).json({ message: "Server error" });
// });

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
























import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import sweetsRoutes from "./routes/sweets.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

app.get("/", (req, res) => res.send("🍬 Sweet Shop API running!"));

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
