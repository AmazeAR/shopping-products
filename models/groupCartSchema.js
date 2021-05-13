
const mongoose = require("mongoose");

const groupCartSchema = mongoose.Schema({             // creating schema for the the group carts collection
  groupId: {
    type: String,
    required: true
  },
  cart: [
    {
      productId: String
    }
  ]
});

const GroupCart = mongoose.model("group cart", groupCartSchema);   // group carts collection 

module.exports = GroupCart;
