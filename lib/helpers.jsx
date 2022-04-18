import img from "next/image"
import {WeaponItem, ArmorItem} from "./items.ts";

export function formatItemElement(name, price, image_path, item_type, attributes) {
	let otherAttributes;
	let fullpath = "/images/items/" + image_path;
	if (item_type === ArmorItem) {
		otherAttributes = (
			<>
				<div className="attribute-wrapper">
					<div className="coin-image-sale">
						<img src="/images/icons/coin.png"></img>
					</div>
					<span className="sale-attribute">
						{price}
					</span>
				</div>
				<div className="attribute-wrapper">
					<div className="defense-image-sale">
						<img src="/images/icons/shield.png"></img>
					</div>
					<span className="sale-attribute">
						{attributes.defense}
					</span>
				</div>

				<div className="attribute-wrapper">
					<div className="toughness-image-sale">
						<img src="/images/icons/muscle.png"></img>
					</div>
					<span className="sale-attribute">
						{attributes.toughness}
					</span>
				</div>
				<div className="attribute-wrapper">
					<div className="durability-image-sale" >
						<img src="/images/icons/durability.png"></img>
					</div>
					<span className="sale-attribute">
						{attributes.durability}
					</span>
				</div>
			</>
		);
	} else if (item_type === WeaponItem) {
		otherAttributes = (
			<>
			
				<div className="attribute-wrapper">
					<div className="coin-image-sale">
						<img src="/images/icons/coin.png" ></img>
					</div>
					<span className="sale-attribute">
						{price}
					</span>
				</div>

				<div className="attribute-wrapper">
					<div className="attack-image-sale">
						<img src="/images/icons/sharpness.png"></img>
					</div>
					<span className="sale-attribute">
						{attributes.attack}
					</span>
				</div>
				
				<div className="attribute-wrapper">
					<div className="toughness-image-sale">
						<img src="/images/icons/muscle.png"></img>
					</div>
					<span className="sale-attribute">
						{attributes.toughness}
					</span>
				</div>
				<div className="attribute-wrapper">
					<div className="durability-image-sale" >
						<img src="/images/icons/durability.png"></img>
					</div>
					<span className="sale-attribute">
						{attributes.durability}
					</span>
				</div>
			</>
		);
	};
	return (
		<div className="sale-wrapper">
			<div className="market-sale">
				<div className="sale-name-wrapper">
					<div className="sale-image">
						<img src={fullpath} ></img>
					</div>

					<span className="sale-name">{name}</span>
				</div>
				
			</div>
			<div className="sale-info">
				
				{otherAttributes}
			</div>
		</div>
	)
};

export const staticSales = (
	<>
		<div className="static-sale-box" id="market-armor-sale">

		</div>

		<div className="static-sale-box" id="market-weapon-sale">

		</div>
	</>
);