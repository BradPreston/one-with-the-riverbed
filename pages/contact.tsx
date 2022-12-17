import { useState } from "react"
import { H1 } from "../components/headings"
import s from "../styles/Contact.module.css"
import Head from "next/head"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

export default function Contact() {
	const [firstName, setFirstName] = useState<string>()
	const [lastName, setLastName] = useState<string>()
	const [email, setEmail] = useState<string>()
	const [message, setMessage] = useState<string>()
	const { executeRecaptcha } = useGoogleReCaptcha()

	async function sendEmail(e: any) {
		e.preventDefault()
		const data = {
			firstName,
			lastName,
			email,
			message
		}

		if (!executeRecaptcha) {
			return
		}

		try {
			const token = await executeRecaptcha()
			if (!token) {
				return
			}

			const result = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})

			if (result) {
				console.log(result)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Head>
				<title>Show Dates | One with the Riverbed</title>
			</Head>
			<H1 title="Contact Us" />
			<section className="max-w-3xl mx-auto overflow-hidden">
				<form onSubmit={sendEmail}>
					<div className={s.personalInfo}>
						<p className={s.inputWrapper}>
							<label htmlFor="firstname">First Name:*</label>
							<input
								className={s.input}
								type="text"
								id="firstname"
								name="firstname"
								placeholder="Scott"
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</p>
						<p className={s.inputWrapper}>
							<label htmlFor="lastname">Last Name:*</label>
							<input
								className={s.input}
								type="text"
								id="lastname"
								name="lastname"
								placeholder="Stapp"
								onChange={(e) => setLastName(e.target.value)}
							/>
						</p>
						<p className={s.inputWrapper}>
							<label htmlFor="email">Email:*</label>
							<input
								className={s.input}
								type="email"
								id="email"
								name="email"
								placeholder="scott.stapp@creedrocks.com"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</p>
						<p className={s.inputWrapper}>
							<label htmlFor="message">Message:*</label>
							<textarea
								name="message"
								id="message"
								cols={30}
								rows={10}
								className={s.input}
								placeholder="Type your message here"
								onChange={(e) => setMessage(e.target.value)}
							></textarea>
						</p>
						<p>
							<input
								className={s.sendButton}
								type="submit"
								name="submit"
								id="submit"
								value="Send"
							/>
						</p>
					</div>
				</form>
			</section>
		</>
	)
}
