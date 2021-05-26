const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");
const createError = require("http-errors");
const mongoose = require("mongoose");
const Category = require("../models/categorySchema");
const sendResponse = require('../lib/response');

// Get all products without description for a specific category from database and send to user
router.get("/:category_name", (req, res, next) => {

    Product.find({ categoryName: req.params.category_name }, { description: 0 })
        .then((data) => {
            if (!data || !data.length) {
                throw createError(404, "Category does not exits");
            }
            sendResponse(res,data,null);
        })
        .catch((err) => {
            next(err);
            sendResponse(res,null,{ message: err });
        });
});

//Get unique product from database and send to user
router.get("/product/:product_id", (req, res, next) => {

    Product.find({ _id: req.params.product_id })
        .then((data) => {
            if (!data || !data.length) {
                throw createError(404, "Product does not exits");
            }
            sendResponse(res,data,null);
        })
        .catch((err) => {
            if (err instanceof mongoose.CastError) {
                next(createError(400, "Invalid product id"));
                return;
            }
            next(err);
            sendResponse(res,null,{ message: err });
        });
});

// Post a product to database
router.post("/", (req, res, next) => {

    const product = new Product({
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        productName: req.body.productName,
        brandName: req.body.brandName,
        productImage: req.body.productImage,
        price: req.body.price,
        description: req.body.description,
        is_3dmodel: req.body.is_3dmodel,
    });

    Category.find({ categoryName: product.categoryName, _id: product.categoryId })  // first check weather added categoryName or categoryId is exist or not
        .then((data) => {
            if (!data || !data.length) {
                throw createError(404, "You cannot add this category product. Either check the typo in categoryName or categoryId or add this category first in category list");
            } 
            else {
                product
                .save()
                .then((saveRes) => {
                    sendResponse(res,saveRes,null);
                })
                .catch((err) => {
                    if (err.name === "ValidationError") {
                        next(createError(422, err.message));
                        return;
                    }
                    next(err);
                    sendResponse(res,null,{ message: err });
                });
            }
        })
        .catch((err) => {
            next(err);
            sendResponse(res,null,{ message: err });
        });

});

// return all the products from database
router.get("/", (req, res, next) => {
    Product.find({})
    .then((data) => {
        if (!data || !data.length) {
            throw createError(404, "Product does not exits");
        }
        sendResponse(res,data,null);
    })
    .catch((err) => {
        if (err instanceof mongoose.CastError) {
            next(createError(400, "Invalid product id"));
            return;
        }
        next(err);
        sendResponse(res,null,{ message: err });
    });
})

module.exports = router;