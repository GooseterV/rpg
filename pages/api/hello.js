import { generateSales } from "../../lib/market"
export default async function handler(req, res) {
	console.log(await generateSales());
	res.status(200).json({ name: 'John Doe' });
};
