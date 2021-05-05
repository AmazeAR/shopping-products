const mongoose = require("mongoose");

// creating schema for product
const productSchema = mongoose.Schema({
  category: String,
  name: String,
  price: Number,
  imageURL: String,
  description: String,
});

module.exports = mongoose.model("product", productSchema);