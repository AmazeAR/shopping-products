const express = require("express");
const GroupCart = require("../models/groupCartSchema");
const router = express.Router();

// OPTIONAL get all the group carts from database although its only one in our case // just in case
router.get("/", (req, res) => {

  GroupCart.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({findingError:err})
    });

});

// fetching items of group cart
router.get("/:group_id", (req, res) => {

  GroupCart.find({ groupId: req.params.group_id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ findingError: err });
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
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.json({savingError:err})
          });

      }
      else{
        // adding new product in existing group cart
        const newProduct = {
          productId: req.params.product_id
        };

        GroupCart.updateOne({ groupId: req.params.group_id }, { $addToSet: { cart: newProduct } })  // addToSet prevents the multiple addition of item into cart
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.json({savingError:err})
          });               
      }   
    })
    .catch((err) => {
      res.json({ findingError: err });
    });

});

module.exports = router;
