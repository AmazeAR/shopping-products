const express = require("express");
const router = express.Router();
const Category = require("../models/categorySchema");
const createError = require("http-errors");
const mongoose = require("mongoose");
const sendResponse = require('../lib/response');

router.get("/", (req, res, next) => {
  
  Category.find({})
    .then((data) => {
      if (!data || !data.length) {
        throw createError(404, "Categories not found!");
      }
    res.send(data);
//       sendResponse(res,data,null);
    })
    .catch((err) => {
      next(err);
      sendResponse(res,null,err);
    });
});

router.post("/", (req, res, next) => {

  const category = new Category({
    categoryName: req.body.categoryName,
    categoryImage: req.body.categoryImage,
  });

  category.save()
    .then((data) => {
      sendResponse(res,data,null);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(createError(422, err.message));
        return;
      }
      next(err);
      sendResponse(res,null,err);
    });
});

module.exports = router;
