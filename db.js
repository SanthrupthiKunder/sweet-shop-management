// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop");
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error("❌ DB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;












// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop");
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error("❌ DB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;










const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbURI =
      process.env.NODE_ENV === "test"
        ? "mongodb://127.0.0.1:27017/sweetshop_test" // used only during tests
        : "mongodb://127.0.0.1:27017/sweetshop";     // normal dev database

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected to ${dbURI}`);
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

