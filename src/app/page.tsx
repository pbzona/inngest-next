import { inngestMain } from "@/inngest/client";
import { redirect } from "next/navigation";

export default function Home() {
	async function triggerInngestEvent() {
		"use server";
		await inngestMain.send({
			name: "workflow/main.step",
			data: {
				message: "Hello from Next.js!",
			},
		});
		redirect("http://localhost:8288/stream");
	}
	return (
		<main>
			<div>
				<form action={triggerInngestEvent}>
					<button type="submit">Trigger Your Inngest Function</button>
				</form>
			</div>
		</main>
	);
}
