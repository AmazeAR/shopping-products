const express = require("express");
const PersonalCart = require("../models/personalCartSchema");
const Product = require("../models/productSchema");
const router = express.Router();

// Get all item from personal cart 
router.get("/:userId", (req, res) => {
  PersonalCart.find({user: req.params.userId})
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
    res.json({findingError:err})
  })
});

//adding item to personl cart
router.post("/:userId/:productId", (req, res) => {
  Product.findById(req.params.productId)
    .then((data) => {
      console.log(data);
      new PersonalCart({
        user: req.params.userId,
        name: data.name,
        price: data.price,
        imageURL: data.imageURLrs
      })
        .save()
        .then((data1) => {
          res.json(data1);
        })
        .catch((err) => {
          res.json({ savingError: err });
        });
    })
    .catch((err) => {
      res.json({ findingError: err });
    });
});

module.exports = router;
