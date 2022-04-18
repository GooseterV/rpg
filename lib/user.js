import { MongoClient } from "mongodb";
import { hashPassword, genUUID } from './utils';


export async function createUser(username, email, password) {
	const client = new MongoClient("mongodb://localhost:27017");
	try {
		await client.connect()
	
		const data = client.db("rpg");
		const users = data.collection("users");
		const pswd = await hashPassword(password);
		//console.log(await userExists(email))
		//console.log(await users.find().toArray())
		if (await userExists(email)) {
			await client.close();
		} else  {
			const user = {
				"name":username,
				"email":email,
				"password":pswd,
				"_id":genUUID(),
				"data":{
					"health":100,
					"gold":100,
					"inventory":{
						"backpack":[

						],
						"equipment":{
							"armor":{
								"head":null,
								"chest":null,
								"legs":null,
								"feet":null
							},
							"mainhand":null,
							"offhand":null
						}
					}
				}
			};
			
			await users.insertOne(user);
			await client.close();
			return {
				"name":username,
				"email":email,
				"_id":user._id
			};
		}
	
	} catch (err) {
		console.log(err);
	};
};



export async function getUser(id) {
	const client = new MongoClient("mongodb://localhost:27017");
	try {
		await client.connect();
		const data = client.db("rpg");
		const users = data.collection("users");
		const user = users.findOne({"_id":id}).then(
			async () => {
				await client.close();
			}
		);
		if (user) {
			return user;
		} else {
			return null;
		};

	} catch (err) {
		console.log(err);
	};
};

export async function getUserGold(name) {
	try {
		const user = getUserFromName(name);
		if (user) {
			return user.data.gold;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err);
	};
};

export async function getUserFromEmail(email) {
	const client = new MongoClient("mongodb://localhost:27017");
	try {
		await client.connect();
		const data = client.db("rpg");
		const users = data.collection("users");
		const user = await users.findOne({"email":email});
		await client.close();
		if (user) {
			return user;
		} else {
			return null;
		};
	} catch (err) {
		console.log(err);
	};
};

export async function userExists(email) {
	const client = new MongoClient("mongodb://localhost:27017");
	try {
		await client.connect();
		const data = client.db("rpg");
		const users = data.collection("users");
		const user = await users.findOne({"email":email});
		await client.close()
		
		console.log(user)
		if (user) {
			console.log("user does exist")
			return true;
		} else {
			console.log("user does not exist")
			return false;
		};
		
	} catch (err) {
		console.log(err);
	};
};

export async function userExistsByName(username) {
	const client = new MongoClient("mongodb://localhost:27017");
	try {
		await client.connect();
		const data = client.db("rpg");
		const users = data.collection("users");
		const user = await users.findOne({"name":username});
		await client.close()
		
		console.log(user)
		if (user) {
			console.log("user does exist")
			return true;
		} else {
			console.log("user does not exist")
			return false;
		};
		
	} catch (err) {
		console.log(err);
	};
};

export async function getUserFromName(username) {
	const client = new MongoClient("mongodb://localhost:27017");
	try {
		await client.connect();
		const data = client.db("rpg");
		const users = data.collection("users");
		const user = await users.findOne({"name":username});
		await client.close();
		if (user) {
			return user;
		} else {
			return null;
		};
	} catch (err) {
		console.log(err);
	};
};

export async function updateUserGold(username, newGold) {
	const client = new MongoClient("mongodb://localhost:27017");
	try {
		await client.connect();
		const data = client.db("rpg");
		const users = data.collection("users");
		const user = await getUserFromName(username);
		
		if (user) {
			user.gold = newGold;
			await users.updateOne({"name":username}, user, async ()=>{
				await client.close();
			})
			return true;
		} else {
			return false;
		};
	} catch (err) {
		console.log(err);
	};
};