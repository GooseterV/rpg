import Image from "next/image";


export default function Footer() {
	return (
		<div className="footer">
			<p className="footertext">
				Made with <Image layout="fill" objectFit="contain" className="footericon" src="/heart_yellow.png"/> by <a href="https://github.com/gooseterv">GooseterV</a>
			</p>
		</div>
	)
}