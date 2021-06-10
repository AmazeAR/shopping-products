const express = require('express');
const router = express.Router();
const User  = require('../models/userSchema');
const createError = require("http-errors");
const sendResponse = require('../lib/response');

// get all the users from the database
router.get("/", (req, res, next) => {

    User.find({})
        .then((data) => {
            sendResponse({response: res, data: data, error:null});
        })
        .catch((err) => {
            next(err);
            sendResponse({response: res, data: null, error: {message: err} });
        });
});

// get a specific user with userId from database
router.get("/:user_id", (req, res, next) => {

    User.find({ userId: req.params.user_id }, {groupCarts: 0})
        .then((data) => {
            if (!data || !data.length) {
                throw createError(404, "User does not exits");
            }
            sendResponse({response: res, data: data, error:null});
        })
        .catch((err) => {
            next(err);
            sendResponse({response: res, data: null, error: {message: err} });
        });
});

// post a user to users collection
router.post("/", (req, res, next) => {

    const user = new User({
        userId: req.body.userId,
        fullName: req.body.fullName,
        emailId: req.body.emailId,
        profileImage: req.body.profileImage,
        groupCarts: []
    });

    User.find({ emailId: user.emailId})
        .then((data) => {
            if(!data || !data.length){
                user.save()
                .then((saveRes) => {
                    sendResponse({response: res, data: saveRes, error:null});
                })
                .catch((err) => {
                    if (err.name === "ValidationError") {
                        next(createError(422, err.message));
                        return;
                      }
                    next(err);
                    sendResponse({response: res, data: null, error: {message: err} });
                });
            }
            else{
                throw createError(404, "User email already registered!");
            }
        })
        .catch((err) => {
            next(err);
            sendResponse({response: res, data: null, error: {message: err} });
        });
});

// get all the groups of a user
router.get('/groupCarts/:user_id', (req,res) => {
    User.find({userId: req.params.user_id})
    .then((data) => {
        if(!data || !data.length){
            throw createError(404, "User does not exits");
        }
        else{
            const groupCarts = data[0].groupCarts;
            groupCarts.reverse();
            sendResponse({response: res, data: groupCarts, error: null});
        }
    })
    .catch((err) => {
        sendResponse({response: res, data: null, error:{findingError: err} });
    });

})

// add a groupCart for a user
router.post('/groupCart/:user_id/:group_name/:group_id', (req,res) => {

    User.find({userId: req.params.user_id})
    .then((data) => {
        if(!data || !data.length){
            throw createError(404, "User does not exits");
        }
        else{
            const newGroupCart = {
                groupId: req.params.group_id,
                groupName: req.params.group_name,
                timeStamp: new Date().toDateString(),
            };
            User.updateOne(
                { userId: req.params.user_id },
                { $addToSet: { groupCarts: newGroupCart } }
              ) // addToSet avoids the multiple addition of same meeting group
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

// remove a particular groupCart for a user
router.delete('/groupCart/:user_id/:group_id', (req,res) => {
    User.find({userId: req.params.user_id})
    .then((data) => {
        if(!data || !data.length){
            throw createError(404, "User does not exits");
        }
        else{
            const deleteGroupCart = {
                groupId: req.params.group_id,
            };
            User.updateOne(
                { userId: req.params.user_id },
                { $pull: { groupCarts: deleteGroupCart } }
            ) 
            .then((deleteRes) => {
                sendResponse({response: res, data: deleteRes, error:null});
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