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
				<div className="projects-box box">
					<div className="projects-row">
						<a className="material-icons project-icon" href="https://github.com/gooseterv/cooking">
							&#xea47; 
						</a>
						<a className="material-icons project-icon" href="https://github.com/gooseterv/factorygame">
							&#xebbc; 
						</a>
						<a className="material-icons project-icon" href="https://github.com/gooseterv/pyspectrum">
							&#xe891;
						</a>
						<a className="material-icons project-icon" href="https://github.com/gooseterv/fuyu">
							&#xeb3b;
						</a>
						<a className="material-icons project-icon" href="https://github.com/gooseterv/blooket">
							&#xe238;
						</a>
						<a className="material-icons project-icon" href="https://github.com/gooseterv/googletrans-button">
							&#xe8e2;
						</a>
					</div>
				</div>
			</body>
		</>
	)
};
