
const mongoose = require("mongoose");

// creating schema for product
const personalCartSchema = mongoose.Schema({              // creating schema for the the personalCarts collection
  user: String,
  name: String,
  price: Number,
  imageURL: String,
});

const PersonalCart =  mongoose.model("PersonalCart", personalCartSchema);    // personalCarts collection 

module.exports = PersonalCart;
