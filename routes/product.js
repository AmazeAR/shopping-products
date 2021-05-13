const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");
const createError = require("http-errors");
const mongoose = require("mongoose");

// Get all products without description for a specific category from database and send to user
router.get("/:category_name", (req, res, next) => {

  Product.find({ categoryName: req.params.category_name }, {description: 0})
    .then((data) => {
      // ! ? if category_name is not present in database than should i return error or simpli return []
      // kapil -> I think u should give error at this point coz a user cannot call that api anyway and if somehow we are calling that api point then it would be better if we got the error for easy debugging the problem
      if (!data || !data.length) {
        throw createError(404, "Category does not exits");
      }
      res.json(data);
    })
    .catch((err) => {
      next(err)
      res.json({ message: err });
    });
});

//Get unique product from database and send to user
router.get("/product/:product_id", (req, res, next) => {

  Product.find({_id : req.params.product_id})
    .then((data) => {
      if (!data || !data.length) {
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
    categoryId: req.body.categoryId,
    categoryName: req.body.categoryName,
    productName: req.body.productName,
    brandName: req.body.brandName,
    productName: req.body.productName,
    price: req.body.price,
    description: req.body.description,
    is_3dmodel: req.body.is_3dmodel,
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
