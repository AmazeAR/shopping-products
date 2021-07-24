const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
	await mongoose
		.connect(process.env.MONGODB_URI, {
			dbName: process.env.DB_NAME,
			user: process.env.DB_USER,
			pass: process.env.DB_PASSWORD,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			keepAlive: true,
		})
		.then((x) => {
			console.log(
				`Connected to Mongo! Database name: "${x.connections[0].name}"`
			);
		})
		.catch((err) => console.log(err.message));

	return mongoose;

	// mongoose.connection.on("connected", () => {
	//   console.log("Mongoose connected to db...");
	// });

	// mongoose.connection.on("error", (err) => {
	//   console.log(err.message);
	// });

	// mongoose.connection.on("disconnected", () => {
	//   console.log("Mongoose connection is disconnected...");
	// });

	// process.on("SIGINT", () => {
	//   mongoose.connection.close(() => {
	//     console.log(
	//       "Mongoose connection is disconnected due to app termination..."
	//     );
	//     process.exit(0);
	//   });
	// });
};
