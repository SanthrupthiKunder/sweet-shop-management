import express from "express";
import Sweet from "../models/Sweet.js";
import auth from "../middleware/auth.js";

const router = express.Router();
const ADMIN_EMAIL = "admin@sweetshop.com";

// GET all sweets (protected)
router.get("/", auth, async (req, res) => {
  try {
    const sweets = await Sweet.find(); // return all sweets
    res.json(sweets);
  } catch (err) {
    console.error("Get sweets error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// SEARCH (protected)
router.get("/search", auth, async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };
    if (minPrice || maxPrice) query.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };

    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const sweet = new Sweet({
      name,
      category: category || "",
      price: Number(price) || 0,
      quantity: Number(quantity) || 0,
      userId: req.user.userId,
    });
    await sweet.save();
    res.status(201).json({ message: "Sweet added", sweet });
  } catch (err) {
    console.error("Add error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE (protected) - owner or admin
router.put("/:id", auth, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (String(sweet.userId) !== String(req.user.userId) && req.user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(sweet, req.body);
    await sweet.save();
    res.json({ message: "Updated", sweet });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE (protected) - admin only
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.email !== ADMIN_EMAIL) return res.status(403).json({ message: "Admin only" });

    const deleted = await Sweet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Sweet not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PURCHASE (protected)
router.post("/:id/purchase", auth, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    if (sweet.quantity <= 0) return res.status(400).json({ message: "Out of stock" });

    sweet.quantity -= 1;
    await sweet.save();
    res.json({ message: "Purchased", sweet });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// RESTOCK (protected) - admin only
router.post("/:id/restock", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const { amount } = req.body;
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += Number(amount || 1);
    await sweet.save();
    res.json({ message: "Restocked", sweet });
  } catch (err) {
    console.error("Restock error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
