
const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({        // creating schema for the the categories collection
    id: { 
        type: String,
        required: true 
    },
    productId: {
        type: String, 
        required: true
    }
})

const Cart = mongoose.model("cart_products", cartSchema);   // categories collection

module.exports = Cart;
