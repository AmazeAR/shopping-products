const mongoose = require("mongoose");

// creating schema for product
const GroupCartSchema = mongoose.Schema({
  group: String,
  name: String,
  price: Number,
  imageURL: String,
});

module.exports = mongoose.model("groupCart", GroupCartSchema);
