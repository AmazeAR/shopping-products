const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const createError = require("http-errors");
const sendResponse = require('./src/lib/response');

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Import Routes
const categoryRoute = require("./src/routes/category");
app.use("/categories", categoryRoute);

const productsRoute = require("./src/routes/product");
app.use("/products", productsRoute);

const usersRoute = require("./src/routes/user");
app.use("/users", usersRoute);

const personalCartRoute = require("./src/routes/personalCart");
app.use("/personalCart", personalCartRoute);

const groupCartRoute = require("./src/routes/groupCart");
app.use("/groupCart", groupCartRoute);

const modelRoute = require("./src/routes/model");
app.use("/model", modelRoute);

// connect to mongoDB
require("./initDB")();

//base url
app.get("/", (req, res) => {
  const greetingObj = {
    projectName: "AmazAR",
    message: "We are building an online shopping application with functionality of AR and collaborative shopping!"
  }
  sendResponse({response: res, data: greetingObj, error: null});
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
