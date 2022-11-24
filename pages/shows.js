import styles from '../styles/Shows.module.scss';
import Head from 'next/head';
import moment from 'moment';

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
	const showDates = shows.map((show) => {
		let dt = moment(show.starts_at, 'YYYY-MM-DD HH:mm:ss');
		let day = dt.format('dddd').substring(0, 3);
		let month = dt.format('MMMM').substring(0, 3);
		let hour = dt.hour() > 12 ? dt.hour() - 12 : dt.hour();
		let minute = dt.minute() !== 0 ? dt.minute() : `${dt.minute()}0`;
		let starttime = `${hour}:${minute}`;

		let info = {
			artist: show.artist ? show.artist.name : show.lineup[0],
			venue: `${
				show.venue.name.startsWith('The')
					? show.venue.name
					: 'The ' + show.venue.name
			}`,
			date: `${day}, ${month} ${dt.date()} @ ${starttime}PM`,
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
			<h1>Show Dates</h1>
			<ul className={styles.showdates}>
				{showDates.map((show) => (
					<li key={show.id} className={styles.show}>
						<div className={styles.show_info}>
							<h2>
								{show.artist} at {show.venue}
							</h2>
							<p>{show.date}</p>
							<p>
								{show.address
									? `${show.venue}, ${show.address}, ${show.location}`
									: `${show.venue}, ${show.location}`}
							</p>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
