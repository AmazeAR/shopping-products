
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

    User.find({ userId: req.params.user_id })
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
        profileImage: req.body.profileImage
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

module.exports = router;