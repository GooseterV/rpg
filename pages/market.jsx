import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "next-auth/react"
import { formatItemElement } from '../lib/helpers';
import {staticSales } from "../lib/helpers";
import { ArmorItem, WeaponItem } from '../lib/items.ts';
const axios = require("axios");

export default function Market({ data }) {
	const { data:session, status } = useSession();
	const [goldAmount, setGoldAmount] = useState(0);
	const [market, setMarket] = useState({});
	const [firstRun, setFirstRun ] = useState(true);
	const [sales, setSales] = useState([]);
	useEffect(
		()=>{
			const loading = status === "loading" ? true : false;
			const load = session ? () => {
				console.log("session");
				axios.get(`./api/users/${session.user.name}`).then(r => {
					setGoldAmount(r.data.data.data.gold);
				});
			} : ()=>{
				window.location.pathname = "/signin";
				setGoldAmount(0);
			};
			
			if (firstRun) axios.get(`./api/markets/new`).then(r => {
				if (r.data.data) {
					setMarket(r.data.data);
					r.data.data.sales.forEach(i => {
						let isweapon = i.type === "weapon" ? true : false;
						let type = i.type === "weapon" ? WeaponItem: ArmorItem;
						let data = isweapon ? {
							attack:i.item.damage,
							toughness:i.item.toughness,
							durability:i.item.durability,
		
						}: {
							defense:i.item.defense,
							toughness:i.item.toughness,
							durability:i.item.durability,
						};
						console.log(type)
						if (sales.length < 5) sales.push(formatItemElement(i.item.name, i.price, i.item.image, type, data));
					});
				};

			});
			if (!loading) load();

			return ()=>{setFirstRun(false)};
		}, [session]
	);

	

	return (
		<>
			<Head>
				<title>{market._id}</title>
				<meta name="description" content="RPG Market." />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<div className="gold-holder">
					<div className="gold-wrapper">

						<img className="gold-icon" src="/images/icons/coin.png"></img>

					
					
						<span className="gold-amount">
							{goldAmount}
						</span>
					</div>
				</div>
				<div className="market-main">
					<div id="market-sales">
						{sales}

					</div>
				</div>
				<div className="market-main-static-sales">
					<div className="maket-sales-static">
						{staticSales}
					</div>
				</div>
			</body>
		</>
	)
};


