import { Footer, Header } from '../../components';
import Head from 'next/head';

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
				<main className="main"><div className="site-border">{children}</div></main>
				{/* <Footer /> */}
			</div>
		</div>
	);
}
