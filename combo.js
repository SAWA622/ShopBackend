// combo.js
const router = require("express").Router();
const mongoose = require("mongoose");

const ComboSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Combo = mongoose.model("Combo", ComboSchema);

router.post("/", async (req, res) => {
  const newCombo = new Combo(req.body);
  try {
    const savedCombo = await newCombo.save();
    res.status(200).json(savedCombo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const combos = await Combo.find().populate("products");
    res.status(200).json(combos);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/suggest", async (req, res) => {
  const productIds = req.query.products;
  try {
    const combos = await Combo.find({
      products: { $in: productIds },
    }).populate("products");
    const suggestions = [];
    for (let combo of combos) {
      const containsAll = productIds.every((id) =>
        combo.products.some((product) => product._id.equals(id))
      );
      if (containsAll) {
        suggestions.push(combo);
      }
    }
    suggestions.sort((a, b) => a.price - b.price);
    res.status(200).json(suggestions);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
