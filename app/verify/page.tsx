import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type ReactElement } from "react";

export default function page(): ReactElement {
	return (
		<div>
			<h1>Verification Page</h1>
			<p>Verified Successfully!</p>
			<Link href={"/profile"}>
				<Button>Setup Profile</Button>
			</Link>
		</div>
	);
}
