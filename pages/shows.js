import styles from '../styles/Shows.module.scss';
import Head from 'next/head';
import moment from 'moment';
import { useEffect, useState } from 'react';

export async function getStaticProps() {
	const res = await fetch(
		`https://rest.bandsintown.com/artists/one%20with%20the%20riverbed/events?app_id=${process.env.APP_ID}`
	);
	const data = await res.json();

	return {
		props: {
			shows: data,
		},
	};
}

export default function Shows({ shows }) {
	const [isMobile, setIsMobile] = useState();

	useEffect(() => {
		if (window.screen.width <= 900) setIsMobile(true);
		else setIsMobile(false);

		window.addEventListener('resize', function() {
			if (window.screen.width <= 900) setIsMobile(true);
			else setIsMobile(false);
		});
	});

	const showDates = shows.map((show) => {
		let dt = moment(show.starts_at, 'YYYY-MM-DD HH:mm:ss');
		let day = dt.format('dddd').substring(0, 3);
		let month = dt.format('MMMM').substring(0, 3);
		let year = dt.format('YYYY');
		let hour = dt.hour() > 12 ? dt.hour() - 12 : dt.hour();
		let minute = dt.minute() !== 0 ? dt.minute() : `${dt.minute()}0`;
		let starttime = `${hour}:${minute}`;

		let info = {
			id: show.id,
			url: show.url,
			artist: show.artist ? show.artist.name : show.lineup[0],
			/*venue: `${
				show.venue.name.startsWith('The')
					? show.venue.name
					: 'The ' + show.venue.name
			}`,*/
			venue: show.venue.name,
			//date: `${day}, ${month} ${dt.date()} @ ${starttime}PM`,
			date: `${day}, ${month.toUpperCase()} ${dt.date()}, ${year}`,
			location: show.venue.location,
			address: show.venue.street_address,
		};
		return info;
	});

	return (
		<>
			<Head>
				<title>Shows | One with the Riverbed</title>
			</Head>
			<div className={styles.showsBorder}>
			<h1>Show Dates</h1>
			{showDates.length !== 0 ? 
				<>
			<ul className={styles.showdates}>
				{showDates.map((show) => (
					<li key={show.id} className={styles.show}>
						<div className={styles.show_info}>
							<div className={styles.dateAndVenue}>
								<h2>{show.date}</h2>
								<h3>{show.venue}</h3>
								{isMobile === true ? <p>{show.location}</p> : null}
							</div>
							<div className={styles.addressAndTickets}>
								{isMobile === false ? <p>{show.location}</p> : null}
								<a href={show.url}>Tickets</a>
							</div>
						</div>
					</li>
				))}
			</ul>
			<a href="#" className={styles.request}>Request a show</a>
				</>: <p className={styles.noShows}>No scheduled shows</p>}
			</div>
		</>
	);
}
