import { genHexID } from "./utils";

enum Tiers {
	COMMON,
	UNCOMMON,
	RARE,
	SUPER_RARE,
	LEGENDARY,
	MYTHICAL,
	EXOTIC,	
};

class Item {
	readonly name: string;
	readonly image: string;
	readonly flavor_text: string;
	readonly id: string;
	constructor(name:string, identifier:string, image:string, flavor_text:string) {
		this.name = name;
		this.image = image;
		this.flavor_text = flavor_text;
		this.id = identifier;
	};
};

class TieredItem extends Item {
	tier: number;
	constructor(name:string, identifier:string, image:string, flavor_text:string, tier:number, ) {
		super(name, identifier, image, flavor_text);
		this.tier = tier;
	};
};

export class ArmorItem extends TieredItem {
	defense: number;
	toughness: number;
	durability: number;
	block_percent: number;
	max_durability: number;
	constructor(name:string, identifier:string, image:string, flavor_text:string, defense:number, toughness:number, durability:number, block_percent:number, tier:number, max_durability:number) {
		super(name, identifier, image, flavor_text, tier);
		this.defense = defense;
		this.toughness = toughness;
		this.durability = durability;
		this.block_percent = block_percent;
		this.max_durability = max_durability;
	};
};

export class WeaponItem extends TieredItem {
	damage: number;
	durability: number;
	toughness: number;
	max_durability: number;
	crit_percent: number;
	constructor(name:string, identifier:string, image:string, flavor_text:string, damage:number, toughness: number, durability:number, crit_percent:number, tier:number, max_durability:number) {
		super(name, identifier, image, flavor_text, tier);
		this.damage = damage;
		this.durability = durability;
		this.toughness = toughness;
		this.max_durability = max_durability;
		this.crit_percent = crit_percent;
		
	};
	upgrade(type:string, damage_boost:any , crit_boost:any) {
		if (this.tier <= 6 && type === "tier") {
			this.tier += 1;
		} else if (type === "damage") {
			if (damage_boost) {
				this.damage += damage_boost;
			};
		} else if (type === "crit") {
			if (crit_boost) {
				this.crit_percent += crit_boost;
			};
		};
	};
	
};

export class MarketItem {
	price: number;
	sale_id: string;
	type: string;
	item: Item;
	constructor(price:number, item:Item) {
		this.sale_id = genHexID(16);
		this.price = price;
		this.item = item;
		if (item instanceof WeaponItem ) this.type = "weapon";
		else if (item instanceof ArmorItem) this.type = "armor";
		else this.type = "item"; 
		console.log(this.type)
	};
};


export const Weapons  = {
	IRON_SWORD: new WeaponItem(
		"Iron Sword", "iron_sword",
		"iron_sword.png",
		"Better than your fists, not quite as good as steel, can't go wrong with a classic iron blade.",
		6, 2, 728, 15, Tiers.UNCOMMON, 728
	),
	DIAMOND_SWORD: new WeaponItem(
		"Diamond Sword", "diamond_sword", 
		"diamond_sword.png", 
		"One of the hardest materials on the planet, these can deal some serious damage.",
		10, 5, 1560, 25, Tiers.RARE, 1560
	),

};

export const Armor = {
	IRON_HELMET: new ArmorItem(
		"Iron Helmet", "iron_helmet", 
		"iron_helmet.png", 
		"Better than nothing, but not quite as good as stainless steel, this helmet works like a charm.",
		3, 2, 556, 5, Tiers.UNCOMMON, 556
	),
	IRON_CHESTPLATE: new ArmorItem(
		"Iron Chestplate", "iron_chestplate", 
		"iron_chestplate.png", 
		"Better than nothing, but not quite as good as stainless steel, this chestplate can take a hit or two.",
		5, 2, 648, 5, Tiers.UNCOMMON, 648
	),
	IRON_LEGGINS: new ArmorItem(
		"Iron Leggings", "iron_leggings", 
		"iron_leggings.png", 
		"Better than nothing, but not quite as good as stainless steel, these pants arent the most comfortable.",
		4, 2, 583, 5, Tiers.UNCOMMON, 583
	),
	IRON_BOOTS: new ArmorItem(
		"Iron Boots", "iron_boots", 
		"iron_boots.png", 
		"Better than nothing, but not quite as good as stainless steel, these shoes arent meant to wear around the house.",
		2, 2, 512, 5, Tiers.UNCOMMON, 512
	),
	DIAMOND_BOOTS: new ArmorItem(
		"Diamond Boots", "diamond_boots", 
		"diamond_boots.png", 
		"One of the hardest materials on the planet, these can take a hit or two.",
		4, 5, 1028, 10, Tiers.RARE, 1028
	),
	DIAMOND_LEGGINGS: new ArmorItem(
		"Diamond Leggings", "diamond_leggings", 
		"diamond_leggings.png", 
		"One of the hardest materials on the planet, these can take a hit or two.",
		7, 5, 1240, 10, Tiers.RARE, 1240
	),
	DIAMOND_CHESTPLATE: new ArmorItem(
		"Diamond Chestplate", "diamond_chestplate", 
		"diamond_chestplate.png", 
		"One of the hardest materials on the planet, these can take a hit or two.",
		10, 5, 1560, 10, Tiers.RARE, 1560
	),
	DIAMOND_HELMET: new ArmorItem(
		"Diamond Helmet", "diamond_helmet", 
		"diamond_helmet.png", 
		"One of the hardest materials on the planet, these can take a hit or two.",
		3, 5, 1116, 10, Tiers.RARE, 1116
	),
};


export const weapons = Object.values(Weapons).map(i=>{return i.name;});
export const armor = Object.values(Armor).map(i=>{return i.name;});
export const items = armor.concat(weapons);