const express = require("express");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const port = process.env.PORT || 5000;
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Middle Ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.guif9pr.mongodb.net/your-database-name?retryWrites=true&w=majority`;

async function run() {
	const client = new MongoClient(uri);

	try {
		await client.connect(); // Establish the MongoDB connection

		const db = client.db();

		/* Collections */
		const emailCollection = client.db("Global_server").collection("Emails");
		const carCollection = client.db("Global_server").collection("Cars");

		/* Routes */
		app.get("/emails", async (req, res) => {
			const query = {};
			const result = await carCollection.find(query).toArray();
			res.status(200).send(result);
		});

		app.post("/email", async (req, res) => {
			const data = req.body;
			const result = await emailCollection.insertOne(data);

			// NodeMailer
			// const transporter = await nodemailer.createTransport({
			// 	host: "smtp.ethereal.email",
			// 	service: "nodemailer",
			// 	port: 587,
			// 	auth: {
			// 		user: "breanne75@ethereal.email",
			// 		pass: "1sK5WyzMefWHyPRC1g",
			// 	},
			// });

			// const info = await transporter.sendMail({
			// 	from: '"Get Global 👻" <notify@getglobal.com>',

			// 	to: "m.naimur61@gmail.com",

			// 	subject: "Get Global Notified Confirmation!",

			// 	text: "Hello! welcome to Get global",

			// 	html: "<b>Hello! welcome to Get global</b>",
			// });

			// transporter.sendMail(info, (err) => {
			// 	if (err) {
			// 		console.log("It's an error", err);
			// 	} else {
			// 		console.log("Email sent!");
			// 	}
			// });

			res.status(200).send({ massage: "Notified successful!", result });
		});

		/* Default Route */
		app.get("/", (req, res) => {
			res.send("Global Server");
		});
	} finally {
	}
}

run().catch(console.error);

app.listen(port, () => {
	console.log(`Node is running in ${port}`);
});
