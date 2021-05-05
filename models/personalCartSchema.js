const mongoose = require("mongoose");

// creating schema for product
const personalCartSchema = mongoose.Schema({
  user: String,
  name: String,
  price: Number,
  imageURL: String,
});

module.exports = mongoose.model("personalCart", personalCartSchema);
