import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { getUserData, getUserFromEmail, userExists } from "../../../lib/user";
import { comparePassword, hashPassword } from "../../../lib/utils";
export default NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: "Email", type: "text", placeholder: "your@email.com" },
				password: {  label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const user = await userExists(credentials.email) ? await getUserFromEmail(credentials.email): null;
				if (! await comparePassword(credentials.password, user.password)) {
					return null;
				};
				if (user) {
					console.log("user exists")
					// Any object returned will be saved in `user` property of the JWT
					return { 
						name:user.name,
						email: credentials.email,
						_id:user._id,
						user:user.data
					};
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					console.log("nonexistant")
					return null;
					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
			callbacks: {
				jwt: async ({ token, user }) => {
					user && (token.user = user)
					console.log("hi2")
					const u = await userExists(user.email) ? await getUserFromEmail(user.email): null;
					if (u) {
						token.user._id = u._id;
						token.user.data = u.data;
					} else {
						token.user._id = null;
						token.user.data = {};
					}
					console.log(token);
					return token;
				},
				session: async ({ session, token }) => {
					session.user = token.user
					console.log("hi")
					console.log(token)
					return session;
				}
			}
		})
	],
	secret: "4tax0VgPo3I3xuLdJX0hYdkQ4DyghyZ46GvSWSY2dR7Z/cFIZE8AEDr7jDbf2C9Hyd/xkpILDsHbRMh5CCiW4D+GqeM5BSFWW4ddK+rtY1/J5tlVcZMQGuf9PaK81gAvY78Cg/ICXP3py8kdmg+h9fVjCAn2A51AFkbosrTF4tBBKYdPegW+KRIItee/6blKZnkl/Bw8b6PGUdQT9vKxGc3qIiWaOELRQkyvXBGi+oiFsI5BT/RAvmTuiCkjJ9ZnbCiAb/BUM/J519Zp/+fqeXbVai41rS7zVtQD+K+ADXTeyxn/uD7JV9c34j7iClQjmmgYAvHa57ASRUvEZrJcN9v206odG3qc/j4fW/IFlfzsbXjH0ZIZkQWwWYuWYF2BxxobY3QlR9GDAUyyHCz9SYfU71hYkwe4QeX7zI4syheg8fGkJUecL8mDWjRQl4E+s3OVmZETiCM5fy88AF0FQ8cbEUNil8vdup+O5N5YZ/B4iU+Bj3rtWAmjcMxtvtVSFQlNc0IOuHoOr+jig2S126oGDWUu/1qCvRfnhzt8MCHEW9y0y/kcjTwVls1APWtyh947SStOOJqF5EWH1ZdKPAJWIVPjlFUS1I1NvwKbsuc/Gj0UXQPl/HhwcsUkaGJy0mS9rEe67YabLTYSgfIpdw10HEMhN0Dt5AaFZUNfNl0=", // process.env.NEXTAUTH_SECRET,
	jwt:{
		maxAge: 60 * 60 * 24 * 30,
	}
})