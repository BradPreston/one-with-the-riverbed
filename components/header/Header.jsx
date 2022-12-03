import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './header.module.scss';

export default function Header() {
	const [isMobile, setIsMobile] = useState();
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	useEffect(() => {
		const navlinks = document.querySelector('nav') ? document.querySelector('nav').children : null;
		if (navlinks) {
			for (let link of navlinks) {
				if (link.pathname == window.location.pathname) {
					link.style.color = '#dcd7c9';
				} else {
					link.style.color = '#ffffff';
				}
			}
		}

		if (window.screen.width <= 900) setIsMobile(true);
		else setIsMobile(false);

		window.addEventListener("resize", function() {
			if (window.screen.width <= 900) setIsMobile(true);
			else setIsMobile(false);
		});

		document.querySelectorAll('nav a').forEach(link => {
			link.addEventListener('click', function() {
				setMobileNavOpen(false)
			})
		})
	});

	return (
		<>
			{isMobile === false ? 
			<header className={styles.header}>
				<h1>
					<Link href="/">One with the Riverbed</Link>
				</h1>
				<nav className="container">
					<Link href="/">Home</Link>
					<Link href="/shows">Shows</Link>
					<Link href="/discography">Discography</Link>
					<Link href="/media">Media</Link>
					<Link href="https://onewiththeriverbed.bandcamp.com/merch" target="_blank">
						Merch
					</Link>
				</nav>
			</header> : 
			<header className={styles.mobileHeader}>
				<div className={styles.mobileNavIcon} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
					{mobileNavOpen === false ? 
					<div className={styles.hamburger}>
						<span></span>
						<span></span>
						<span></span>
					</div> :
					<div className={styles.cross}>
						<span></span>
						<span></span>
					</div>}
				</div>
				<div className={mobileNavOpen === true ? `${styles.mobileNavOpen}` : `${styles.mobileNavClosed}`}>
					<nav>
						<Link href="/">Home</Link>
						<Link href="/shows">Shows</Link>
						<Link href="/discography">Discography</Link>
						<Link href="/media">Media</Link>
						<Link href="https://onewiththeriverbed.bandcamp.com/merch" target="_blank">
							Merch
						</Link>
					</nav>
				</div>
			</header>}
		</>
	);
}
