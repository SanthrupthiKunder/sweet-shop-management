const Sweet = require('../models/Sweet');

exports.createSweet = async (req, res, next) => {
  try {
    const { name, category, price, quantity } = req.body;
    if (!name || !category || price == null || quantity == null) return res.status(400).json({ message: 'Missing fields' });
    const s = await Sweet.create({ name, category, price, quantity });
    res.status(201).json(s);
  } catch (err) { next(err); }
};

exports.getSweets = async (req, res, next) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) { next(err); }
};

exports.searchSweets = async (req, res, next) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (err) { next(err); }
};

exports.updateSweet = async (req, res, next) => {
  try {
    const s = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json(s);
  } catch (err) { next(err); }
};

exports.deleteSweet = async (req, res, next) => {
  try {
    const s = await Sweet.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

exports.purchaseSweet = async (req, res, next) => {
  try {
    const s = await Sweet.findById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    if (s.quantity <= 0) return res.status(400).json({ message: 'Out of stock' });
    s.quantity -= 1;
    await s.save();
    res.json(s);
  } catch (err) { next(err); }
};

exports.restockSweet = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (amount == null || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    const s = await Sweet.findById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    s.quantity += Number(amount);
    await s.save();
    res.json(s);
  } catch (err) { next(err); }
};
