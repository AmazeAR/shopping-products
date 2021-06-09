const express = require("express");
const Cart = require("../models/cartSchema");
const router = express.Router();
const sendResponse = require("../lib/response");
const getProductsFromCart = require('../lib/cartProducts');

// Get all the products of a particular cart
router.get("/:id", (req, res) => {
  Cart.find({ id: req.params.id }, {productId: 1, _id: 0})
    .then((cart) => {
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

// add item to cart
router.post("/:id/:product_id", (req, res) => {

    const cartProduct = new Cart({
        id: req.params.id,
        productId: req.params.product_id
    })

    Cart.find({id: cartProduct.id, productId: cartProduct.productId})
    .then((data) => {
        if(data !=null && data.length!=0){
            // product is already exist in that cart. so to avoid duplication dont add this product again
            sendResponse({response: res, data: "product is already exist in the cart!", error: null});
        }
        else{
            cartProduct.save()
            .then((saveRes) => {
                sendResponse({response: res, data: saveRes, error:null});
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


// deletes a perticular item from cart
router.delete("/:id/:product_id", (req,res) => {
    Cart.deleteOne({id: req.params.id, productId: req.params.product_id})
    .then((data) => {
        sendResponse({response: res, data: data, error: null});
    })
    .catch((err) => {
        console.log(err);
        sendResponse({response: res, data: data, error: null});
    })
})

module.exports = router;