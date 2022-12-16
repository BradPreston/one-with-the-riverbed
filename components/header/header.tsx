import { NavLink } from "../../types/NavLink"
import Link from "next/link"
const links = require("../../data/navlinks.json")
import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import { ActiveImageContext } from "../../context/ActiveImageContext"
import s from "./header.module.css"

export default function Header() {
	const router = useRouter()
	const { activeImage } = useContext<any>(ActiveImageContext)
	const [isMobile, setIsMobile] = useState<boolean>()
	const [mobileNavOpen, setMobileNavOpen] = useState(false)

	useEffect(() => {
		if (window.screen.width <= 900) setIsMobile(true)
		else setIsMobile(false)

		window.addEventListener("resize", function () {
			if (window.screen.width <= 900) setIsMobile(true)
			else setIsMobile(false)
		})

		document.querySelectorAll("nav a").forEach((link) => {
			link.addEventListener("click", function () {
				setMobileNavOpen(false)
			})
		})
	}, [])

	return (
		<>
			{isMobile === false ? (
				<header className={`${s.header} ${activeImage ? "z-0" : "z-20"}`}>
					<Link href="/">One with the Riverbed</Link>

					<nav id="nav" className="flex justify-end">
						{links.map((navLink: NavLink) => (
							<Link
								href={navLink.href}
								title={navLink.title}
								key={navLink.title}
								target={navLink.target}
								className={` navLink
							px-4 last:pr-0 last:border-0 border-r border-white border-solid text-xl font-light ${
								router.pathname == navLink.href ? "text-sand" : "text-white"
							}`}
							>
								{navLink.title}
							</Link>
						))}
					</nav>
				</header>
			) : (
				<header className={`${s.mobileHeader} ${activeImage ? "z-0" : "z-50"}`}>
					<div
						className={s.mobileNavIcon}
						onClick={() => setMobileNavOpen(!mobileNavOpen)}
					>
						{mobileNavOpen === false ? (
							<div className={s.hamburger}>
								<span></span>
								<span></span>
								<span></span>
							</div>
						) : (
							<div className={s.cross}>
								<span></span>
								<span></span>
							</div>
						)}
					</div>
					<div
						className={
							mobileNavOpen === true
								? `${s.mobileNavOpen}`
								: `${s.mobileNavClosed}`
						}
					>
						<nav>
							<Link href="/">Home</Link>
							<Link href="/shows">Shows</Link>
							<Link href="/discography">Discography</Link>
							<Link href="/media">Media</Link>
							<Link
								href="https://onewiththeriverbed.bandcamp.com/merch"
								target="_blank"
							>
								Merch
							</Link>
						</nav>
					</div>
				</header>
			)}
		</>
	)
}