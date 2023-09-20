// deal.js
const router = require("express").Router();
const mongoose = require("mongoose");

const DealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Deal = mongoose.model("Deal", DealSchema);

router.post("/", async (req, res) => {
  const newDeal = new Deal(req.body);
  try {
    const savedDeal = await newDeal.save();
    res.status(200).json(savedDeal);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find().populate("products");
    res.status(200).json(deals);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
