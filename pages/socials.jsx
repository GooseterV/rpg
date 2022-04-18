import Head from 'next/head'

export default function Projects() {
	return (
		<>
			<Head>
				<title>Goose's Page - Projects </title>
				<meta name="description" content="Projects" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<div className="socials-box box">
					<div className="socials-card">
						<div className="socials-title">
							<i class="fa-brands fa-github"></i>
							<a className="socials-name" href="https://github.com/gooseterv">
								GooseterV
							</a>
						</div>
						<div className="socials-title">
							<i class="fa-brands fa-xbox"></i>
							<a className="socials-name" href="">
								GooseterV
							</a>
						</div>
					</div>
				</div>
			</body>
		</>
	)
};
