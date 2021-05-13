
const mongoose = require("mongoose");

const personalCartSchema = mongoose.Schema({              // creating schema for the the personal carts collection
  userId: {
    type: String,
    required: true
  },
  cart: [
    {
      productId: String
    }
  ]
});

const PersonalCart =  mongoose.model("personal cart", personalCartSchema);    // personal carts collection 

module.exports = PersonalCart;
