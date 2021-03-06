const express = require("express");
const createError = require("http-errors");
const sendResponse = require('../lib/response');
const MeetParticipants = require("../models/meetParticipantsSchema");
const getUsersFromUserId  = require('../lib/shoppingMembers');

const router = express.Router();

// get all the members of shopping group
router.get('/:group_id', (req,res) => {

    MeetParticipants.find({groupId: req.params.group_id})
    .then((meet) => {
        if(!meet || !meet.length){
            throw createError(404,"shopping group does not exist!");
        }
        else{
            
            const meetObj = meet[0];
            const participants = meetObj.participants;
            getUsersFromUserId(participants)
            .then((users) => {
                sendResponse({response: res, data: users, error:null});
            })
            .catch((err) => {
                sendResponse({response: res, data: null, error: {message: err.message} });
            })
           
        }
    })
    .catch((err) => {
        sendResponse({response: res, data: null, error:{findingError: err} });
    });
})

// add a members to shopping group
router.post('/:group_id/:user_id', (req,res) => {

    MeetParticipants.find({groupId: req.params.group_id})
    .then((meet) => {
        // create a new shopping group with host as a user
        if(!meet || !meet.length){
            const newMeetGroup = new MeetParticipants({
                groupId: req.params.group_id,
                participants: [
                    {
                        userId: req.params.user_id
                    }
                ]
            })
            newMeetGroup.save(newMeetGroup)
            .then((saveRes) => {
                sendResponse({response: res, data: saveRes, error: null});
            })
            .catch((err) => {
                sendResponse({response: res, data: null, error: {savingError: err} });
            })
        }
        else{
            const newParticipant = {
                userId: req.params.user_id,
            }
            MeetParticipants.updateOne(
                { groupId: req.params.group_id },
                { $addToSet: { participants: newParticipant } }
            )
            .then((updateRes) => {
                sendResponse({response: res, data: updateRes, error:null});
            })
            .catch((err) => {
                sendResponse({response: res, data: null, error: {savingError: err} });
            });
        }
    })
    .catch((err) => {
        console.log(err);
        sendResponse({response: res, data: null, error:{findingError: err} });
    });

})

// removing a members from shopping group
router.delete('/:group_id/:user_id', (req,res) => {

    MeetParticipants.find({groupId: req.params.group_id})
    .then((meet) => {
        if(!meet || !meet.length){
            throw createError(404,"shopping group does not exist!");
        }
        else{
            const newParticipant = {
                userId: req.params.user_id,
            }
            MeetParticipants.updateOne(
                { groupId: req.params.group_id },
                { $pull: { participants: newParticipant } }
            )
            .then((updateRes) => {
                sendResponse({response: res, data: updateRes, error:null});
            })
            .catch((err) => {
                sendResponse({response: res, data: null, error: {savingError: err} });
            });
        }
    })
    .catch((err) => {
        sendResponse({response: res, data: null, error:{findingError: err} });
    });
    
})

module.exports = router;
