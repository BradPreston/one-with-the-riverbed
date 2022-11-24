import Link from 'next/link';
import { useEffect } from 'react';
import styles from './header.module.scss';

export default function Header() {
	useEffect(() => {
		const navlinks = document.querySelector('nav').children;
		for (let link of navlinks) {
			if (link.pathname == window.location.pathname) {
				link.style.color = '#dcd7c9';
			} else {
				link.style.color = '#ffffff';
			}
		}
	});
	return (
		<>
			<header className={styles.header}>
				<h1>
					<Link href="/">One with the Riverbed</Link>
				</h1>
				<nav className="container">
					<Link href="/">Home</Link>
					<Link href="/shows">Shows</Link>
					<Link href="/discography">Discography</Link>
					<Link href="https://onewiththeriverbed.bandcamp.com/merch">
						Merch
					</Link>
					<Link href="/media">Media</Link>
				</nav>
			</header>
		</>
	);
}
