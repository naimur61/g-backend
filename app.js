import express from "express";
import cors from "cors";
const app = express();
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

const port = process.env.PORT || 5000;

// Middle Ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.guif9pr.mongodb.net/your-database-name?retryWrites=true&w=majority`;

async function run() {
	const client = new MongoClient(uri);

	try {
		const db = client.db();

		/* <------------------------------------------- Collections  -----------------------------------------> */
		const emailCollection = client.db("Global_server").collection("Emails");

		/* <------------------------------------------- Get Folder -----------------------------------------> */

		app.get("/emails", async (req, res) => {
			const query = {};
			const cursor = folderCollection.find(query);
			const result = await cursor.toArray();
			res.status(200).send(result);
		});

		/* <-------------------------------------------  X  -----------------------------------------> */
		app.get("/", (req, res) => {
			res.send("Global Server");
		});
	} finally {
	}
}
run().catch(console.dir);

app.listen(port, () => {
	console.log(`node is running in ${port}`);
});
