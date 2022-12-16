import { H1 } from "../components/headings"
import { ShowDate } from "../components/shows"
import { Show, APIShows } from "../types/Shows"
import moment from "moment"
import Head from "next/head"

export async function getStaticProps() {
	const res = await fetch(
		`https://rest.bandsintown.com/artists/one%20with%20the%20riverbed/events?app_id=${process.env.APP_ID}`
	)
	const data = await res.json()

	return {
		props: {
			shows: data
		}
	}
}

export default function Shows({ shows }: APIShows) {
	const showDates = shows.map((show) => {
		let dt = moment(show.starts_at, "YYYY-MM-DD HH:mm:ss")
		let day = dt.format("dddd").substring(0, 3)
		let month = dt.format("MMMM").substring(0, 3)
		let year = dt.format("YYYY")

		let info: Show = {
			id: show.id,
			purchase_tickets_url: show.url.replace(
				`app_id=${process.env.APP_ID}`,
				""
			),
			venue: show.venue.name,
			date: `${day}, ${month.toUpperCase()} ${dt.date()}, ${year}`,
			location: show.venue.location
		}
		return info
	})

	return (
		<>
			<Head>
				<title>Show Dates | One with the Riverbed</title>
			</Head>
			<section className="max-w-3xl mx-auto">
				<H1 title="Show Dates" />
				<ul>
					{showDates.map((show: Show) => (
						<li key={show.id}>
							<ShowDate
								date={show.date}
								venue={show.venue}
								location={show.location}
								purchase_tickets_url={show.purchase_tickets_url}
							/>
						</li>
					))}
				</ul>
			</section>
		</>
	)
}