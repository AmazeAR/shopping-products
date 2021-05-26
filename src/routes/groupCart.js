const express = require("express");
const GroupCart = require("../models/groupCartSchema");
const router = express.Router();
const sendResponse = require('../lib/response');
const getProductsFromCart = require('../lib/cartProducts');

// OPTIONAL get all the group carts from database although its only one in our case // just in case
router.get("/", (req, res) => {

  GroupCart.find({})
    .then((data) => {
      sendResponse({response: res, data: data, error: null});
    })
    .catch((err) => {
      sendResponse({response: res, data: null, error:{findingError: err} });
    });

});

// fetching products of group cart
router.get("/:group_id", (req, res) => {

  GroupCart.find({ groupId: req.params.group_id })
    .then((data) => {
      return data[0]; // data is in array of 1 object
    })
    .then((data) => {
      const groupId = data.groupId;  
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

// adding item to groupCart
router.post("/:group_id/:product_id", (req, res) => {

  GroupCart.find({ groupId: req.params.group_id })
    .then((data) => {
      
      if(!data || !data.length){
        // creating the group cart to add the first product
        const groupCart = new GroupCart({
          groupId: req.params.group_id,
          cart: [
            {
              productId: req.params.product_id
            }
          ]
        });

        groupCart.save()
          .then((saveRes) => {
            sendResponse({response: res, data: saveRes, error:null });
          })
          .catch((err) => {
            sendResponse({response: res, data: null, error:{savingError: err} });
          });

      }
      else{
        // adding new product in existing group cart
        const newProduct = {
          productId: req.params.product_id
        };

        GroupCart.updateOne({ groupId: req.params.group_id }, { $addToSet: { cart: newProduct } })  // addToSet prevents the multiple addition of item into cart
          .then((updateRes) => {
            sendResponse({response: res, data: updateRes, error:null });
          })
          .catch((err) => {
            sendResponse({response: res, data: null, error:{savingError: err} });
          });               
      }   
    })
    .catch((err) => {
      sendResponse({response: res, data: null, error:{findingError: err} });
    });

});

module.exports = router;
