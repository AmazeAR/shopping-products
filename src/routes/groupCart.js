const express = require("express");
const GroupCart = require("../models/groupCartSchema");
const router = express.Router();
const sendResponse = require('../lib/response');

// OPTIONAL get all the group carts from database although its only one in our case // just in case
router.get("/", (req, res) => {

  GroupCart.find({})
    .then((data) => {
      sendResponse(res,data,null);
    })
    .catch((err) => {
      sendResponse(res,null,{findingError:err});
    });

});

// fetching items of group cart
router.get("/:group_id", (req, res) => {

  GroupCart.find({ groupId: req.params.group_id })
    .then((data) => {
      sendResponse(res,data,null);
    })
    .catch((err) => {
      sendResponse(res,null,{findingError:err});
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
            sendResponse(res,saveRes,null);
          })
          .catch((err) => {
            sendResponse(res,null,{savingError: err});
          });

      }
      else{
        // adding new product in existing group cart
        const newProduct = {
          productId: req.params.product_id
        };

        GroupCart.updateOne({ groupId: req.params.group_id }, { $addToSet: { cart: newProduct } })  // addToSet prevents the multiple addition of item into cart
          .then((updateRes) => {
            sendResponse(res,updateRes,null);
          })
          .catch((err) => {
            sendResponse(res,null,{savingError: err});
          });               
      }   
    })
    .catch((err) => {
      sendResponse(res,null,{findingError: err});
    });

});

module.exports = router;
