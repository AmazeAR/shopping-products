const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const morgan = require("morgan");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
// app.use(express.json());
app.use(cors());
// app.use(morgan("dev"));

// Import Routes
const categoryRoute = require("./routes/category");
app.use("/categories", categoryRoute);

const productsRoute = require("./routes/product");
app.use("/products", productsRoute);

const usersRoute = require("./routes/user");
app.use("/users", usersRoute);

const personalCartRoute = require("./routes/personalCart");
app.use("/personlCart", personalCartRoute);

const groupCartRoute = require("./routes/groupCart");
app.use("/groupCart", groupCartRoute);

const modelRoute = require("./routes/model");
app.use("/model", modelRoute);

// connect to mongoDB
require("./initDB")();

//base url
app.get("/", (req, res) => {
  res.send("working");
});

// wrong end point error handling
app.use((req, res, next) => {
  next(createError(404, "Not found"));
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

PORT = process.env.PORT || 7600;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
