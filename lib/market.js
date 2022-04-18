import { MongoClient } from "mongodb";
import { genUUID, randomChoiceFromArray, shuffle } from "./utils";
import { items, MarketItem, WeaponItem, ArmorItem } from "./items.ts";



export async function getMarkets() {

	const client = new MongoClient("mongodb://localhost:27017");
	
	try {
		await client.connect();
		const data = client.db("rpg");
		const res = data.collection("markets");
		const markets = await res.find().toArray();
		await client.close();
		
		return markets;
		
	} catch (err) {
		console.log(err);
		return null;
	};
	
};

export async function createMarket(sales) {
	try {
		const now = (new Date().getTime()/1000);
		const market = {
			"_id":genUUID(),
			"sales":sales,
			"start":now,
			"end":now + 3600
		};
		
		return market;
		
	} catch (err) {
		console.log(err);
		return null;
	};
};

export async function storeMarket(market) {

	const client = new MongoClient("mongodb://localhost:27017");
	
	try {
		await client.connect();
		const data = client.db("rpg");
		const markets = data.collection("markets");
		await markets.insertOne(market);
		await client.close();
		
		return market;
		
	} catch (err) {
		console.log(err);
		return null;
	};
};

export function genPrice(item) {
	console.log(item)
	if (item instanceof WeaponItem || item instanceof ArmorItem) {
		console.log("generating item price")
		console.log(item)
		const tier = item.tier;
		consle.log(item)
		const multi = 17.35;
		if (item instanceof WeaponItem) {
			const [damage, crit_percent, toughness] = [item.damage, item.crit_percent, item.toughness];
			return +Math.round((tier * ( ( damage * multi) + (toughness * 7.75) + (crit_percent / 5) )));
		} else if (item instanceof ArmorItem) {
			const [defense, toughness, block_percent] = [item.defense, item.toughness, item.block_percent];
			return +Math.round((tier * ( ( defense * multi ) + (toughness * 7.5) + (block_percent / 5) ))); 
		};
	} else {
		return 100*tier;
	}
};

export async function generateSales() {
	const choices = [];
	const able = new Set(shuffle(items));
	for (let i = 0; i < 5; i++) {
		const choice = Array.from( randomChoiceFromArray(Array(able)) )[0];
		const marketed = new MarketItem(genPrice(choice), choice);
		choices.push(marketed);
		able.delete(choice);
	};
	
	return await createMarket(choices);
}; 