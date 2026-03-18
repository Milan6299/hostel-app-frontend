"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { loginUser } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
// import { api } from "@/lib/helpers";

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
			// const tokens = await api.get("/api/csrf/");
			// console.log(tokens);
			const response = await loginUser(formdata);
			console.log(response?.data);
			const data = response?.data;
			if (data.profile_complete === false)
				router.push(`/${data.role}/complete_profile`);
			else router.push(`/${data.role}`);
		} catch (err) {
			alert(err);
		}

		// For development only
		toast("You submitted the following values:", {
			description: (
				<pre className="bg-code text-code-foreground mt-2 w-100 rounded-md p-4">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			position: "bottom-right",
			classNames: {
				content: "flex flex-col gap-2",
			},
			style: {
				"--border-radius": "calc(var(--radius)  + 4px)",
			} as React.CSSProperties,
		});
	}
	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Login Form</CardTitle>
				<CardDescription>
					{
						// Help us improve by reporting bugs you encounter.
					}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="login" onSubmit={form.handleSubmit(onSubmit)}>
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
										<Button
											onClick={() => setVisible(!visible)}
											type="button"
											className="bg-inherit text-foreground absolute right-0"
										>
											{visible ? <LucideEyeOff /> : <LucideEye />}
										</Button>
									</InputGroup>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation="horizontal">
					<Button type="button" variant="outline" onClick={() => form.reset()}>
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
