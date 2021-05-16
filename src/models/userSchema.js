
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({     // creating schema for the users collection
    fullName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
})

const User = mongoose.model("User", userSchema);   // users collection

module.exports = User;