import { getCsrfToken } from "next-auth/react"

export default function SignIn({ csrfToken }) {
	return (
		<form method="post" action="/api/auth/callback/credentials" className="signin-box">
			<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
			<input name="email" type="text" className="signin-creds-box"/>
			<input name="password" type="password" className="signin-creds-box"/>
	  		<button type="submit" className="signin-button-box">Sign in</button>
		</form>
  	);
};


export async function getServerSideProps(context) {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
  	};
};

