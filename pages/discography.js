const discography = require('../data/discography.json');
import styles from '../styles/Discography.module.scss';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Discography() {
	const [showReviews, setShowReviews] = useState(false);
	const [isMobile, setIsMobile] = useState();
	useEffect(() => {
		if (window.screen.width <= 900) setIsMobile(true);
		else setIsMobile(false);

		window.addEventListener('resize', function() {
			if (window.screen.width <= 900) setIsMobile(true);
			else setIsMobile(false);
		});
	});

	return (
		<>
			<Head>
				<title>Discography | One with the Riverbed</title>
			</Head>
			<h1>Discography</h1>
			<ul className={styles.discography}>
				{discography.map((album) => (
					<>
						<div key={album.title} className={styles.album}>
							<img src={album.artwork} alt={album.title} />
							<div className={styles.album_info}>
								<h2>{album.title}</h2>
								<ul>
									{album.tracklist.map((track, i) => (
										<li key={track}>
											{i + 1}. {track}
										</li>
									))}
								</ul>
								{isMobile === false ? <><p>Released: {album.release_date}</p>
								{album.features ? <p>{album.features}</p> : null}
								{album.artwork_artist ? <p>Album art by {album.artwork_artist}</p> : null}
								{album.studio ? <p>{album.studio}</p> : null}
								{album.logo_artist ? <p>Logo by {album.logo_artist}</p> : null} </> : null}
							</div>
						</div>
								{isMobile === true ? <div className={styles.mobilementions}><p>Released: {album.release_date}</p>
								{album.features ? <p>{album.features}</p> : null}
								{album.artwork_artist ? <p>Album art by {album.artwork_artist}</p> : null}
								{album.studio ? <p>{album.studio}</p> : null}
								{album.logo_artist ? <p>Logo by {album.logo_artist}</p> : null} </div> : null}
						{album.reviews.length > 0 ? (
							<h2 className={styles.reviewsHeading} onClick={(e) => {
								let list = e.target.nextElementSibling;

								list.style.display == "none" ? list.style.display = "block" : list.style.display = "none";
							}}>Reviews {showReviews !== false ? <span>&#x2212;</span> : <span>&#x2b;</span>}</h2>
						) : null}
						
						<ul style={{ display: "none" }} className={styles.reviews}>
							{album.reviews.map((review) => (
								<li key={review.author}>
									<h3>{review.author}</h3>
									<p>{review.excerpt}...</p>
									<a href={review.link} target="_blank" title={review.link}>
										Read more
									</a>
								</li>
							))}
						</ul> 
					</>
				))}
			</ul>
		</>
	);
}
