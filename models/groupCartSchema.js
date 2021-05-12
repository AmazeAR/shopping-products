
const mongoose = require("mongoose");

const groupCartSchema = mongoose.Schema({             // creating schema for the the groupCarts collection
  group: String,
  name: String,
  price: Number,
  imageURL: String,
});

const GroupCart = mongoose.model("GroupCart", groupCartSchema);   // groupCarts collection 

module.exports = GroupCart;
