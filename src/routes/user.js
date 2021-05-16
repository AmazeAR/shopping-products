
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
            sendResponse(res,data,null);
        })
        .catch((err) => {
            next(err);
            sendResponse(res,null,{ message: err });
        });
});

// get a specific user with userId from database
router.get("/:user_id", (req, res, next) => {

    User.find({ _id: req.params.user_id })
        .then((data) => {
            if (!data || !data.length) {
                throw createError(404, "User does not exits");
            }
            sendResponse(res,data,null);
        })
        .catch((err) => {
            next(err);
            sendResponse(res,null,{ message: err });
        });
});

// post a user to users collection
router.post("/", (req, res, next) => {

    const user = new User({
        fullName: req.body.fullName,
        emailId: req.body.emailId,
        profileImage: req.body.profileImage
    });

    User.find({ emailId: user.emailId})
        .then((data) => {
            if(!data || !data.length){
                user.save()
                .then((saveRes) => {
                    sendResponse(res,saveRes,null);
                })
                .catch((err) => {
                    if (err.name === "ValidationError") {
                        next(createError(422, err.message));
                        return;
                      }
                    next(err);
                    sendResponse(res,null,{ message: err });
                });
            }
            else{
                throw createError(404, "User email already registered!");
            }
        })
        .catch((err) => {
            next(err);
            sendResponse(res,null,{ message: err });
        });
});

module.exports = router;