
const mongoose = require("mongoose");
const Product = require("../models/productSchema");
const express = require("express");

//get all products for specific productId that has fetched in carts
const getProductsFromCart = (cart) => {
    return new Promise((resolve) => {
      const products = [];
      for (i = 0; i < cart.length; i++) {
        products.push(mongoose.Types.ObjectId(cart[i].productId));
      }
      Product.find({
        _id: {
          $in: products,
        },
      }, {description: 0})  // products without description
      .then((docs) => {
        resolve(docs);
      })
      .catch((err) => {
        resolve(err);
      });
    });
};

module.exports = getProductsFromCart;