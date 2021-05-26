const express = require("express");
const PersonalCart = require("../models/personalCartSchema");
const router = express.Router();
const sendResponse = require("../lib/response");
const getProductsFromCart = require('../lib/cartProducts');
const Product = require("../models/productSchema");
const mongoose = require("mongoose");

// get all the personal carts from database
router.get("/", (req, res) => {
  PersonalCart.find({})
    .then((data) => {
      sendResponse({response: res, data: data, error:null});
    })
    .catch((err) => {
      sendResponse({response: res, data: null, error:{findingError: err} });
    });
});

// Get products in cart for a specific user
router.get("/:user_id", (req, res) => {
  PersonalCart.find({ userId: req.params.user_id })
    .then((data) => {
      return data[0]; // data is in array of 1 object
    })
    .then((data) => {
      const userId = data.userId;  
      const cart = data.cart;

      getProductsFromCart(cart)
      .then((products) => {
        sendResponse({response: res, data: products, error:null});
      })
      .catch((err) => {
        sendResponse({response: res, data: null, error: {message: err.message} });
      })

    })
    .catch((err) => {
      sendResponse({response: res, data: null, error:{findingError: err} });
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
            sendResponse({response: res, data: saveRes, error:null});
          })
          .catch((err) => {
            sendResponse({response: res, data: null, error: {savingError: err} });
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
            sendResponse({response: res, data: updateRes, error:null});
          })
          .catch((err) => {
            sendResponse({response: res, data: null, error: {savingError: err} });
          });
      }
    })
    .catch((err) => {
      sendResponse({response: res, data: null, error:{findingError: err} });
    });
});

module.exports = router;
