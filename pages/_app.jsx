import '../styles/globals.css'
import Layout from '../components/layout'
import { SessionProvider, useSession, signIn, signOut  } from "next-auth/react"
import React, {useEffect} from 'react';
function App({ Component, pageProps:{ session, ...pageProps } }) {
	useEffect(() => {
		//window.addEventListener('resize', ()=> {
			//if (window.innerWidth < 415 && window.innerHeight > window.innerWidth && window.location.pathname !== "/dragons") window.location.pathname = "/dragons";
		//})
		if (window.innerWidth < 415 && window.innerHeight > window.innerWidth && window.location.pathname !== "/dragons") window.location.pathname = "/dragons";
		
		return () => {};
	}, []);
	console.log("app")
	return 	(
	<SessionProvider session={session}>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</SessionProvider>
	
	);
};

export default App;
