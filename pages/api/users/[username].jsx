import { getUserFromName } from "../../../lib/user";


export default async function handler(req, res) {
	const { username } = req.query;
	try {
		const user = await getUserFromName(username);
		if (user) {
			delete user.password;
			delete user.email;
			res.status(200).json({ success: true, data : user });
		} else {
			res.status(404).json({ success: false, message:"User does not exist."});
		};
	
	} catch (err) {
		console.log(err);
	};
};
