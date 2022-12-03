const discography = require('../data/discography.json');
import styles from '../styles/Discography.module.scss';
import Head from 'next/head';
import { useState } from 'react';

export default function Discography() {
	const [showReviews, setShowReviews] = useState(false);

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
								<p>Released: {album.release_date}</p>
							</div>
						</div>
						{album.reviews.length > 0 ? (
							<h2 className={styles.reviewsHeading} onClick={() => setShowReviews(!showReviews)}>Reviews {showReviews !== false ? <span>&#x2212;</span> : <span>&#x2b;</span>}</h2>
						) : null}
						{showReviews !== false ?  
						<ul className={styles.reviews}>
							{album.reviews.map((review) => (
								<li key={review.author}>
									<h3>{review.author}</h3>
									<p>{review.excerpt}...</p>
									<a href={review.link} target="_blank" title={review.link}>
										Read more
									</a>
								</li>
							))}
						</ul> : null}
					</>
				))}
			</ul>
		</>
	);
}
