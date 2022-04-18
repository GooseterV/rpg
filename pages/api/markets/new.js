import { generateSales } from "../../../lib/market"
export default async function handler(req, res) {
	try {
		const sales = await generateSales();
		res.status(200).json({success:true, data:sales, message:"Successfully generated new market."});
	} catch (err) {
		console.log(err);
		res.status(400).json({success:false, data:null, message:"Something went wrong when generating new market."})
	};
	
};
