import { H1, H2 } from "../components/headings"
const gallery = require("../data/gallery.json")
import Image from "next/image"
import Head from "next/head"
import { useContext } from "react"
import { ActiveImageContext } from "../context/ActiveImageContext"
import { ImageModal } from "../components/modals"

type Video = {
	link: string
}

type Photo = {
	id: string
	link: string
}

export default function Media() {
	const { activeImage, setActiveImage } = useContext(ActiveImageContext)

	return (
		<>
			<Head>
				<title>Media | One with the Riverbed</title>
			</Head>
			<section className="max-w-3xl mx-auto">
				<H1 title="Media" />
				<section className="text-center">
					<H2 title="Promotional Pictures" />
					<div className="grid grid-cols-3 gap-7 mt-4 mb-8"></div>
				</section>
				<section className="text-center">
					<H2 title="Videos" />
					<div className="grid md:grid-cols-3 min-[500px]:grid-cols-2 gap-7 mt-4 mb-8">
						{gallery.videos.map(({ link }: Video) => (
							<iframe
								key={link}
								className="aspect-video w-full bg-black"
								src={link}
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						))}
					</div>
				</section>
				<section className="text-center">
					<H2 title="Live Pictures" />
					<div className="grid md:grid-cols-3 min-[500px]:grid-cols-2 gap-7 mt-4 mb-8">
						{gallery.live.map(({ link, id }: Photo) => (
							<div className="aspect-video w-full relative" key={id}>
								<Image
									src={link}
									alt={link}
									fill
									objectFit="cover"
									onClick={() => setActiveImage(link)}
								/>
							</div>
						))}
					</div>
				</section>
			</section>
			{activeImage ? (
				<section className="w-screen h-screen z-50 top-0 left-0">
					<ImageModal link={activeImage} />
				</section>
			) : null}
		</>
	)
}