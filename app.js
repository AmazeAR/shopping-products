const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const createError = require("http-errors");
const sendResponse = require("./src/lib/response");
// Import Routes
const categoryRoute = require("./src/routes/category");
const productsRoute = require("./src/routes/product");
const usersRoute = require("./src/routes/user");
const descriptionRoute = require("./src/routes/description");
const cartRoute = require("./src/routes/cart");
const participantsRoute = require("./src/routes/meetParticipants");

// config connection enviornment
require("dotenv").config();

// connect to mongoDB
require("./initDB")();

// import mongoose connetion function
const mongo = require("./initDB");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/categories", categoryRoute);

app.use("/products", productsRoute);

app.use("/users", usersRoute);

app.use("/description", descriptionRoute);

app.use("/cart", cartRoute);

app.use("/meetparticipants", participantsRoute);

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		error: {
			status: err.status,
			message: err.message,
		},
	});
});

//base url
app.get("/", (req, res) => {
	const greetingObj = {
		projectName: "AmazeAR",
		message:
			"We are building an online shopping application with functionality of AR and collaborative shopping!",
	};
	sendResponse({ response: res, data: greetingObj, error: null });
});

const PORT = process.env.PORT || 7600;
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
