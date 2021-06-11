
const mongoose = require("mongoose");

const meetParticipants = mongoose.Schema({        // creating schema for the the categories collection
    groupId: { 
        type: String,
        required: true 
    },
    participants: {
        type: Array,
    }
})

const MeetParticipants = mongoose.model("shopping_group_participants", meetParticipants);   // categories collection

module.exports = MeetParticipants;
