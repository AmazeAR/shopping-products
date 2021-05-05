const express = require("express");
const GroupCart = require("../models/groupCartSchema");
const Product = require("../models/productSchema");
const router = express.Router();

// sending group cart items to groupCart
router.get("/:groupId", (req, res) => {
  GroupCart.find({group:req.params.groupId})
    .then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json({ findingError: err });
  })
});

// adding item to groupCart
router.post("/:groupId/:productId", (req, res) => {
  Product.findById(req.params.productId)
    .then((data) => {
      console.log(data);
      new GroupCart({
        group: req.params.groupId,
        name: data.name,
        price: data.price,
        imageURL: data.imageURL,
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
