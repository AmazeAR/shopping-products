
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User  = require('../models/userSchema');
const createError = require("http-errors");

// get all the users from the database
router.get("/", (req, res, next) => {

    User.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
            res.json({ message: err });
        });
});

// get a specific user with userId from database
router.get("/:user_id", (req, res, next) => {

    User.find({ _id: req.params.user_id })
        .then((data) => {
            if (!data || !data.length) {
                throw createError(404, "User does not exits");
            }
            res.json(data);
        })
        .catch((err) => {
            next(err);
            res.json({ message: err });
        });
});

// post a user to users collection
router.post("/", (req, res, next) => {

    // console.log(req.body); // consoling the body of the request

    const user = new User({
        fullName: req.body.fullName,
        emailId: req.body.emailId,
        profileImage: req.body.profileImage
    });

    user.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                next(createError(422, err.message));
                return;
              }
            next(err);
        });
});

module.exports = router;