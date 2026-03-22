"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { loginUser } from "@/lib/auth/auth";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { CircleAlert } from "lucide-react";

export type LoginSchema = {
	email: string;
	password: string;
};
const formSchema = z.object({
	email: z.email(),
	password: z.string().min(8, "Password Must be at least 8 characters!"),
	// .includes([''])
});

export function LoginForm() {
	const router = useRouter();
	const [error, setError] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(formdata: LoginSchema) {
		console.log(formdata);
		try {
			const response = await loginUser(formdata);
			if (response) {
				const data = response.data;
				console.log(response.data);
				if (data.profile_complete === false)
					router.push(`/complete-profile/${data.role}`);
				else router.push(`/${data.role}`);
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const resp = err.response?.data;
				const status = err.status;
				if (status === 403) {
					toast(`${resp?.error}`);
					setError(true);
					router.push("/complete-profile/student");
				}
				if (status === 401) {
					toast(`${resp?.error}`);
					setError(true);
					return;
				}
				if (resp?.code === "INCOMPLETE") {
					toast(`${resp?.error}`);
					router.push(`/complete-profile/${resp.role}/`);
					return;
				}
				if (resp?.code === "WAITING") {
					toast(`${resp.error}`);
					router.push("/waiting");
					return;
				}
			}
		}

		// For development only
		// toast("You submitted the following values:", {
		// 	description: (
		// 		<pre className="bg-code text-code-foreground mt-2 w-100 rounded-md p-4">
		// 			<code>{JSON.stringify(formdata, null, 2)}</code>
		// 		</pre>
		// 	),
		// 	position: "bottom-right",
		// 	classNames: {
		// 		content: "flex flex-col gap-2",
		// 	},
		// 	style: {
		// 		"--border-radius": "calc(var(--radius)  + 4px)",
		// 	} as React.CSSProperties,
		// });
	}
	return (
		<Card className="w-full sm:max-w-md">
			{
				// <CardHeader>
				// 	{
				// 		<CardTitle>Login Form</CardTitle>
				// 	}
				// 	<CardDescription>
				// 		{
				// 			// Help us improve by reporting bugs you encounter.
				// 		}
				// 	</CardDescription>
				// </CardHeader>
			}
			<CardContent>
				<form id="login" onSubmit={form.handleSubmit(onSubmit)}>
					{error && (
						<p className="text-destructive flex gap-2 items-center pb-4">
							<CircleAlert /> Incorrect email or password!
						</p>
					)}
					<FieldGroup>
						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="email">Email</FieldLabel>
									<Input
										{...field}
										id="email"
										aria-invalid={fieldState.invalid}
										placeholder="Email"
										autoComplete="on"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<InputGroup className="relative">
										<Input
											{...field}
											id="password"
											aria-invalid={fieldState.invalid}
											type={visible ? "" : "password"}
											placeholder="Password"
											autoComplete="on"
											className="pr-14"
										/>
									</InputGroup>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Field orientation={"horizontal"}>
							<Checkbox
								id="showpass"
								name="showpass"
								checked={visible}
								onCheckedChange={() => setVisible(!visible)}
							/>
							<FieldLabel htmlFor="showpass">
								{visible ? "Hide" : "Show Password"}
							</FieldLabel>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation="horizontal">
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							form.reset();
							setError(false);
						}}
					>
						Reset
					</Button>
					<Button type="submit" form="login">
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
