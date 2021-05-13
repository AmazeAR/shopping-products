
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({        // creating schema for the the categories collection
    categoryName: { 
        type: String,
        required: true 
    },
    categoryImage: {
        type: String, 
        required: true
    }
})

const Category = mongoose.model("Category", categorySchema);   // categories collection

module.exports = Category;
