import styles from '../styles/Home.module.scss';
import Head from 'next/head';
import BG from '../public/images/bg.JPG';


export default function Home() {
	return (
		<>
			<Head>
				<title>Home | One with the Riverbed</title>
			</Head>
			<div className={styles.bg}></div>
		</>
	);
}
