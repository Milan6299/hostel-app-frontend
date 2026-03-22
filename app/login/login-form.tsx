"use client";

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
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CircleAlert } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { loginUser } from "@/lib/auth/auth";

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
	const [errMsg, setErrMsg] = useState<string>("");
	const [visible, setVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(formdata: LoginSchema) {
		setIsLoading(true);
		console.log(formdata);
		try {
			const response = await loginUser(formdata);
			if (response) {
				console.log(response);
				if (response.profile_complete === false)
					router.push(`/complete-profile/${response.role}`);
				else router.push(`/${response.role}`);
			}
		} catch (err: any) {
			toast(err?.error || "Something went wrong");

			if (err?.status === 403) {
				router.push(`/complete-profile/${err.role || "student"}`);
				return;
			}

			if (err?.status === 401) {
				setError(true);
				setErrMsg(err?.error);
				return;
			}

			if (err?.code === "INCOMPLETE") {
				router.push(`/complete-profile/${err.role}`);
				return;
			}

			if (err?.code === "WAITING") {
				router.push("/waiting");
				return;
			}
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<div>
			<LoadingSpinner isLoading={isLoading} />
			<Card className="w-full sm:max-w-md">
				{
					<CardHeader>
						{<CardTitle className="text-center text-2xl">Login</CardTitle>}
						<CardDescription>
							{
								// Help us improve by reporting bugs you encounter.
							}
						</CardDescription>
					</CardHeader>
				}
				<CardContent className="w-full">
					<form id="login" onSubmit={form.handleSubmit(onSubmit)}>
						{error && (
							<p className="text-destructive flex gap-2 items-center pb-4">
								<CircleAlert /> {errMsg}
							</p>
						)}
						<FieldSet disabled={isLoading}>
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
						</FieldSet>
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
		</div>
	);
}
