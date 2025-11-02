
import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: "" },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Sweet", sweetSchema);
