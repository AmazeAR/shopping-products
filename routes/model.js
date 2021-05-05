const express = require("express");

const router = express.Router();

// sending modal to user
router.get("/", (req, res) => {
  res.send("Model sending");
});

// posting modal to database
router.post("/post", (req, res) => {
  console.log("post req");
  res.send("sending Done");
});

module.exports = router;
