// product.js
const router = require("express").Router();
const mongoose = require("mongoose");

// the Product schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
});

const Product = mongoose.model("Product", ProductSchema);

// POST /products: Add a new product
router.post("/", async (req, res) => {
    console.log(req.body)
    console.log(Product)
    const data={
      "name" : "Samsung Galaxy S21",
      "description": "The is my phone",
        "price": 799.99,
        "category": "Electronics",
        "image": "https://m.media-amazon.com/images/I/41QPv5h1veL._SX300_SY300_QL70_FMwebp_.jpg"
      }
  
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
