const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");
const createError = require("http-errors");
const mongoose = require("mongoose");

// Get all products for a unique category from database and send to user
router.get("/:category", (req, res, next) => {
  Product.find({ category: req.params.category })
    .then((data) => {
      // ! ? if caategory is not present in database than should i return error or simpli return []
      if (!data) {
        throw createError(404, "Category does not exits");
      }
      res.json(data);
    })
    .catch((err) => {
      next(err)
      res.json({ message: err });
    });
});

//Get unique products from database and send to user
router.get("/id/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
    .then((data) => {
      if (!data) {
        throw createError(404, "Product does not exits");
      }
      res.json(data);
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(createError(400, "Invalid product id"));
        return;
      }
      next(err);
    });
});

// Post a product to database
router.post("/", (req, res, next) => {
  const product = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    imageURL: req.body.imageURL,
    description: req.body.description,
  });

  product
    .save()
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
