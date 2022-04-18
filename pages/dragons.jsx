import Head from 'next/head'


export default function Dragons() {
	return (
		<>
			<Head>
				<title>Here Be Dragons</title>
				<meta name="description" content="home" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
                <div className='dragons-main'>
                    <div className="dragons-text">
                        <span className="dragons-title-text">
                            Warning! 
                        </span>
                        <span className="dragons-info-text">
                            Ye be visiting this page with an unoptimized screen width. 
                            <br/>Consider rotating yer device to fit optimized screen sizes.
                            
                            <br></br>

                            <a href="./" className="dragons-link-text">Take me anyways.</a>
                        </span>
                    </div>
                </div>
			</body>
		</>
	)
};
