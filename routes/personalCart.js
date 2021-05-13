
const express = require("express");
const PersonalCart = require("../models/personalCartSchema");
const router = express.Router();

// get all the personal carts from database
router.get("/", (req, res) => {

  PersonalCart.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({findingError:err})
    });

});

// Get cart of a specific user 
router.get("/:user_id", (req, res) => {

  PersonalCart.find({ userId: req.params.user_id })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json({findingError:err})
    });
});

//adding item to personal cart
router.post("/:user_id/:product_id", (req, res) => {

  PersonalCart.find({ userId: req.params.user_id })
    .then((data) => {
      
      if(!data || !data.length){
        // creating the cart for the user to add first product
        const personalCart = new PersonalCart({
          userId: req.params.user_id,
          cart: [
            {
              productId: req.params.product_id
            }
          ]
        });

        personalCart.save()
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.json({savingError:err})
          });
      }
      else{
        // adding new product in existing cart
        const newProduct = {
          productId: req.params.product_id
        };

        PersonalCart.updateOne({ userId: req.params.user_id }, { $addToSet: { cart: newProduct } })  // addToSet prevents the multiple addition of item into cart
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
