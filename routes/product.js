const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");

// Get all products for a unique category from database and send to user
router.get("/:category", (req, res) => {
  Product.find({ category: req.params.category })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

//Get unique products from database and send to user
router.get("/id/:productId", (req, res) => {
  console.log(req.params.productId);
  Product.findById(req.params.productId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// Post a product to database
router.post("/", (req, res) => {
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
      res.json({ message: err });
    });
});

module.exports = router;
