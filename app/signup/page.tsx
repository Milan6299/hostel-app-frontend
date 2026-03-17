import { type ReactElement } from "react";
import WhoIsThis from "./who-is-this";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page(): ReactElement {
	return (
		<div>
			<h1>New User? Sign Up First!</h1>
			<WhoIsThis />
			<Separator />
			<h2>Login</h2>
			<Link href={"/login"}>
				<Button>Login</Button>
			</Link>
		</div>
	);
}
