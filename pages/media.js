import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Media.module.scss';
const gallery = require('../data/gallery.json');

export default function Media() {
	const [activeImage, setActiveImage] = useState();
	return (
		<>
			<Head>
				<title>Media | One with the Riverbed</title>
			</Head>
			<h1>Media</h1>
			<h2 className={styles.galleryHeading}>Pomotional Pictures</h2>
			<h2 className={styles.galleryHeading}>Videos</h2>
			<div className={styles.gallery}>
				{gallery.videos.map((video) => (
					<iframe
						// width="560"
						// height="315"
						src={video.link}
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					/>
				))}
			</div>

			<h2 className={styles.galleryHeading}>Live Pictures</h2>
			<div className={styles.gallery}>
				{gallery.live.map((photo) => (
					<div key={photo.id} className={styles.galleryImgWrapper}>
						<img
							id={photo.id}
							className={styles.galleryImage}
							src={photo.link}
							onClick={() => setActiveImage({ id: photo.id, link: photo.link })}
						></img>
					</div>
				))}
			</div>
			{activeImage ? (
				<div className={styles.imageModal}>
					<div className={styles.imageModalInner}>
						<div
							className={styles.closeModal}
							onClick={() => setActiveImage(null)}
						>
							&#x2715;
						</div>
						<img src={activeImage.link}></img>
					</div>
				</div>
			) : null}
		</>
	);
}
