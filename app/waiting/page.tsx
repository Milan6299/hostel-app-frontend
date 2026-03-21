import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { type ReactElement } from "react";

export default function Waiting(): ReactElement {
	return (
		<div className="flex w-screen items-center justify-center p-4 h-screen">
			<Card className="max-w-sm">
				<CardHeader>
					<h3>Waiting for Approval</h3>
				</CardHeader>
				<CardContent>
					<CardDescription>
						<p>
							We will send you a confirmation email once your account is
							approved! It takes around 12-24 hours.{" "}
						</p>
					</CardDescription>
				</CardContent>
				<CardFooter className="grid gap-4">
					<p>For further querries contact us.</p>
					<Link href={"/contact-us"}>
						<Button>Contact Us</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
