const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const sendResponse = require('../lib/response');
const Product = require("../models/productSchema");

router.get('/:product_id', (req,res) => {

    Product.find({_id: req.params.product_id}, {description:1, _id:0 })
        .then((data) => {
            if(data !== null || data.length !== 0){
                const description = data[0];
                res.send(description);
            }
            else{
                throw createError(404, "Product description does not exits!");
            }
        })
        .catch((err) => {
            sendResponse({response: res, data: null, error:{findingError: err} });
        });
})

module.exports = router;
