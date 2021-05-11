const mongoose = require("mongoose");

// creating schema for product
const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("product", productSchema);
