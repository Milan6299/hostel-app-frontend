"use client";

import { api } from "@/lib/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import { CircleAlert, CircleCheckBig, User } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
export type SignupSchema = {
	email: string;
	username?: string;
	password1: string;
	password2: string;
};
const SignUpForm = ({ role }: { role: string }) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [errMsg, serErrMsg] = useState<string>("");
	const [success, setSuccess] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");

	const router = useRouter();

	const reqSignup = async (formData: SignupSchema) => {
		try {
			const response = await api.post(
				"/api/signup/",
				{ ...formData, username: formData.email, role: role },
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				},
			);
			console.log("response: ", response);
			// alert("Check your mail for verification message.");
			setEmail(formData.email);
			setSuccess(true);
			toast(
				"Submission Successful! Check your gmail for verification message!",
			);
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				const resp = err.response?.data;
				const status = err.status;

				// console.error(resp?.code);
				toast(`${resp?.error}`);
				if (status === 401) {
					return;
				}

				if (resp?.code === "WAITING") {
					router.push("/waiting");
				}
			}
		} finally {
			setIsLoading(false);
		}
	};

	const formSchema = z
		.object({
			email: z.email(),
			// username: z.string().min(5),
			password1: z.string().min(8, "Password Must be at least 8 characters!"),
			password2: z.string(),
			// .includes([''])
		})
		.refine((data) => data.password1 === data.password2, {
			message: "Passwords don't match!",
			path: ["password2"],
		});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			// username: "",
			password1: "",
			password2: "",
		},
	});

	async function onSubmit(formdata: SignupSchema) {
		setIsLoading(true);
		console.log(formdata);
		reqSignup(formdata);
	}
	return (
		<div className="w-full grid gap-4">
			<div className="flex items-center gap-4 justify-center">
				<div className="h-10 w-10 flex overflow-hidden relative">
					<Image
						src={"/fm-logo.png"}
						className="object-cover"
						fill
						alt="fmu-hostel-logo"
					/>
				</div>
				<h2 className="text-2xl flex">FMU Hostel</h2>
			</div>
			{success ? (
				<Card className="mx-auto max-w-sm">
					<CardHeader>
						<CardTitle className="flex justify-center gap-2 items-center">
							<CircleCheckBig className="text-success" />
							Verification Message Sent!
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription className="flex flex-wrap gap-4 justify-center">
							<p className="text-center">
								Thankyou for creating an account. Please check your gmail!{" "}
								{`${email}`}
							</p>
							<Link className="text-center" href={"https://mail.google.com/"}>
								<Button variant={"info"}>Gmail</Button>
							</Link>
						</CardDescription>
					</CardContent>
				</Card>
			) : (
				<Card className="w-full mx-auto sm:max-w-md">
					<CardContent>
						<form id="signup" onSubmit={form.handleSubmit(onSubmit)}>
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

									{
										//
										// <Controller
										// 	name="username"
										// 	control={form.control}
										// 	render={({ field, fieldState }) => (
										// 		<Field data-invalid={fieldState.invalid}>
										// 			<FieldLabel htmlFor="username">Username</FieldLabel>
										// 			<Input
										// 				{...field}
										// 				id="username"
										// 				aria-invalid={fieldState.invalid}
										// 				placeholder="Username"
										// 				autoComplete="on"
										// 			/>
										// 			{fieldState.invalid && (
										// 				<FieldError errors={[fieldState.error]} />
										// 			)}
										// 		</Field>
										// 	)}
										// />
									}

									<Controller
										name="password1"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="password1">Password</FieldLabel>
												<InputGroup className="relative">
													<Input
														{...field}
														id="password1"
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

									<Controller
										name="password2"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="password2">
													Confirm Password
												</FieldLabel>
												<InputGroup className="relative">
													<Input
														{...field}
														id="password2"
														aria-invalid={fieldState.invalid}
														type={visible ? "" : "password"}
														placeholder="Confirm password"
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
								disabled={isLoading}
								type="button"
								variant="outline"
								onClick={() => {
									form.reset();
									setError(false);
								}}
							>
								Reset
							</Button>
							<Button disabled={isLoading} type="submit" form="signup">
								Submit
							</Button>
						</Field>
					</CardFooter>
				</Card>
			)}
			{!success && (
				<div className="lg:min-w-md grid gap-4 mx-auto">
					<Separator />
					<div className="flex gap-2 justify-center items-center">
						<User size={20} />
						<p>Already Registered?</p>
						<Link href={"/login"} className="underline">
							Login
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default SignUpForm;
