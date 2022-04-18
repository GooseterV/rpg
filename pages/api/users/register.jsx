import { createUser, userExists, userExistsByName } from "../../../lib/user";

export default async function handler(req, res) {

	const data = req.body;
	try {
		if (data) {
			
			
			if (data.name && data.email && data.password) {
				if (await userExists(data.email) ) {
					res.status(400).json({ success: false, message: "Email taken."})
					return
				} else if (await userExistsByName(data.name)) {
					res.status(400).json({ success: false, message: "Username taken."})
					return
				};
				
				const user = await createUser(data.name, data.email, data.password);
				res.status(200).json({ success: true, message: "Successfully created user.", data:user});
			} else {
				
				res.status(400).json({ success: false, message: "Missing required parameters. Make sure the request has name, email, and password attributes."});
			};
			
			
		} else {
			res.status(400).json({ success: false, message: "Invalid request body."});
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ success: false, message:"An unknown error occurred." });
	};
	
};
