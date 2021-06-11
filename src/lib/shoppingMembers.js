
const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/userSchema");

// get all users from list of userIDs
const getUsersFromUserId = (participants) => {
    return new Promise((resolve) => {
        const users = [];
        for(let i=0;i<participants.length;i++){
            users.push(participants[i].userId);
        }
        console.log(users);
        User.find({
            userId: {
                $in: users
            },
        }, {userId: 1, fullName: 1, profileImage: 1, emailId: 1, _id: 0})
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            resolve(err);
        });
    })
}

module.exports = getUsersFromUserId;