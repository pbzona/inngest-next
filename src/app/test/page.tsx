import { headers } from "next/headers";

export default async function TestPage() {
	const h = headers();
	return (
		<main>
			<section>
				<pre>{JSON.stringify(h, null, 2)}</pre>
			</section>
		</main>
	);
}
