import { Footer, Header } from '../../components';
import Head from 'next/head';
import BG from '../../public/bg.JPG';
const styling = {
	backgroundImage: `linear-gradient(rgba(44, 54, 57, .85), rgba(44, 54, 57, .85)), url(${BG})`,
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	width: '100vw',
	height: '100vh'
}

export default function Layout({ children }) {
	return (
		<div className="siteWrapper">
			<div>
				<Head>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<Header />
				<main className="main" style={styling}>{children}</main>
				{/* <Footer /> */}
			</div>
		</div>
	);
}
