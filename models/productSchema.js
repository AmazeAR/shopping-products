
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({                 // creating schema for the the products collection
  category: {
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  imageURL: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  }
});

const Product =  mongoose.model("Product", productSchema);      // products collection

module.exports = Product;
