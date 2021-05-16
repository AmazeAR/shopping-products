
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({                 // creating schema for the the products collection
  categoryId: {
    type: String, 
    required: true 
  },
  categoryName: { 
    type: String, 
    required: true 
  },
  productName: {
    type: String,
    required: true
  },
  brandName: {
    type: String,
    required: [true, "brandName of product is required"]
  },
  productImage: { 
    type: String, 
    required: true 
  },
  price: { 
    type: String, 
    required: true 
  },
  description: { 
    type: Object, 
    required: [true, "description of product is required"] 
  },
  is_3dmodel: {
    type: Boolean,
    required: true
  },
  
});

const Product =  mongoose.model("Product", productSchema);      // products collection

module.exports = Product;
