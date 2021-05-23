const express = require("express");
const PersonalCart = require("../models/personalCartSchema");
const router = express.Router();
const sendResponse = require("../lib/response");
const Product = require("../models/productSchema");
const mongoose = require("mongoose");

//get products of Ids that has fetched before
const getProducts = (data) => {
  return new Promise((resolve) => {
    const proId = [];
    for (i = 0; i < data[0]["cart"].length; i++) {
      proId.push(mongoose.Types.ObjectId(data[0]["cart"][i]["productId"]));
    }
    Product.find({
      _id: {
        $in: proId,
      },
    })
      .then((docs) => {
        resolve(docs);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};

// get all the personal carts from database
router.get("/", (req, res) => {
  PersonalCart.find({})
    .then((data) => {
      sendResponse(res, data, null);
    })
    .catch((err) => {
      sendResponse(res, null, { findingError: err });
    });
});

// Get cart of a specific user
router.get("/:user_id", (req, res) => {
  PersonalCart.find({ userId: req.params.user_id })
    .then((data) => {
      getProducts(data).then((result) => {
        // res.send(result);
        sendResponse(res, result, null);
      });
    })
    .catch((err) => {
      sendResponse(res, null, { findingError: err });
    });
});

//adding item to personal cart
router.post("/:user_id/:product_id", (req, res) => {
  PersonalCart.find({ userId: req.params.user_id })
    .then((data) => {
      if (!data || !data.length) {
        // creating the cart for the user to add first product
        const personalCart = new PersonalCart({
          userId: req.params.user_id,
          cart: [
            {
              productId: req.params.product_id,
            },
          ],
        });

        personalCart
          .save()
          .then((saveRes) => {
            sendResponse(res, saveRes, null);
          })
          .catch((err) => {
            sendResponse(res, null, { savingError: err });
          });
      } else {
        // adding new product in existing cart
        const newProduct = {
          productId: req.params.product_id,
        };

        PersonalCart.updateOne(
          { userId: req.params.user_id },
          { $addToSet: { cart: newProduct } }
        ) // addToSet prevents the multiple addition of item into cart
          .then((updateRes) => {
            sendResponse(res, updateRes, null);
          })
          .catch((err) => {
            sendResponse(res, null, { savingError: err });
          });
      }
    })
    .catch((err) => {
      sendResponse(res, null, { findingError: err });
    });
});

module.exports = router;
