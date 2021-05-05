const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const categoryRoute = require("./routes/product");
app.use("/products", categoryRoute);

const personalCartRoute = require("./routes/personalCart");
app.use("/personlCart", personalCartRoute);

const groupCartRoute = require("./routes/groupCart");
app.use("/groupCart", groupCartRoute);

const modelRoute = require("./routes/model");
app.use("/model", modelRoute);

// connect to mongoDB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.log("some error occure during mongoDB connection", error);
  });

app.get("/", (req, res) => {
  res.send("working");
});

PORT = process.env.port || 7600;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
