import { getUserGold } from "../../../../lib/user";


export default async function handler(req, res) {
	const { username } = req.query;

	try {
		
		const gold = await getUserGold(username);
		if (gold) {
			res.status(200).json({ success: true, gold : gold });
		} else {
			res.status(404).json({ success: false, message:"User does not exist."});
		};
		
	} catch (err) {

	};
};
