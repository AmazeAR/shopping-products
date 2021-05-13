const express = require("express");
const router = express.Router();
const Category = require("../models/categorySchema");
const createError = require("http-errors");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  
  Category.find({})
    .then((data) => {
      if (!data || !data.length) {
        throw createError(404, "Categories not found!");
      }
      res.json(data);
    })
    .catch((err) => {
      next(err);
      res.json({ message: err });
    });
});

router.post("/", (req, res, next) => {

  const category = new Category({
    categoryName: req.body.categoryName,
    categoryImage: req.body.categoryImage,
  });

  category.save()
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
