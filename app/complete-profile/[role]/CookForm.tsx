"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
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
import { checkAuth, logoutUser } from "@/lib/auth/auth";
import SelectionMenu from "@/components/selection-menu";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { completeProfile } from "@/lib/api/profile";

const formSchema = z.object({
	first_name: z.string().min(1),
	last_name: z.string().min(1),
	phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
	gender: z.enum(["M", "F", "O"]),
	hostel_block: z.number().min(1),
	hostel_type: z.enum(["boys", "girls"]),
});

export type CompleteCookProfileSchema = z.infer<typeof formSchema>;

export function CookProfileForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<CompleteCookProfileSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			gender: "M",
			phone: "",
			hostel_block: 1,
			hostel_type: "boys",
		},
	});
	useEffect(() => {
		checkAuth()
			.then((resp) => {
				console.log(resp);
				if (resp.profile_complete === true) {
					toast("Profile Completed Already!");
					router.push("/");
				}
			})
			.catch(() => {
				toast("Error Occured! Try logging in again!");
				router.push("/login");
			});
	}, []);

	const handleLogout = async () => {
		await logoutUser()
			.then((resp) => {
				toast(`${resp.message}`);
				router.push("/login");
			})
			.catch((err) => {
				toast("Logout Successful!");
				router.push("/login");
			});
	};

	async function onSubmit(formdata: CompleteCookProfileSchema) {
		setIsLoading(true);
		try {
			const response = await completeProfile(formdata);

			if (response) {
				router.push("/waiting");
			}
		} catch (err: any) {
			const { code, error } = err || {};

			console.log(err);

			if (code === "EXISTS") {
				toast(error);
				router.push("/login");
				return;
			}

			if (code === "WAITING") {
				router.push("/waiting");
				return;
			}

			if (err && typeof err === "object") {
				const messages = Object.values(err).flat().join(", ");
				toast(messages);
			} else {
				toast("Something went wrong");
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="w-full flex flex-col items-center justify-center mt-10 gap-4">
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
			<LoadingSpinner isLoading={isLoading} />
			<Card className="w-full mx-auto sm:min-w-md sm:max-w-xl">
				<CardHeader>
					<CardTitle>Cook Profile</CardTitle>
					<CardDescription>Please fill in the details</CardDescription>
				</CardHeader>

				<CardContent>
					<form
						id="complete-cook-profile"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FieldSet disabled={isLoading} className="grid ">
							<FieldGroup>
								{/* 
							  <FieldTitle className="">Personal Info</FieldTitle>
                First Name */}
								<FieldGroup className="grid sm:grid-cols-2">
									<Controller
										name="first_name"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel>First Name</FieldLabel>
												<Input {...field} placeholder="First Name" />
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									{/* Last Name */}
									<Controller
										name="last_name"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel>Last Name</FieldLabel>
												<Input {...field} placeholder="Last Name" />
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</FieldGroup>
								<FieldGroup className="grid sm:grid-cols-2">
									{/* Phone */}
									<Controller
										name="phone"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel>Phone</FieldLabel>
												<Input {...field} placeholder="Phone Number" />
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									{/* Gender */}
									<Controller
										name="gender"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel>Gender</FieldLabel>

												<SelectionMenu
													placeholder="Select gender"
													items={[
														{ value: "M", label: "Male" },
														{ value: "F", label: "Female" },
														{ value: "O", label: "Other" },
													]}
													value={field.value}
													onChange={field.onChange}
												/>

												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</FieldGroup>
							</FieldGroup>
							<FieldGroup>
								<FieldGroup className="grid sm:grid-cols-3">
									{/* Hostel Type */}
									<Controller
										name="hostel_type"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel>Hostel Type</FieldLabel>

												<SelectionMenu
													placeholder="Select hostel type"
													items={[
														{ value: "boys", label: "Boys Hostel" },
														{ value: "girls", label: "Girls Hostel" },
													]}
													value={field.value}
													onChange={field.onChange}
												/>

												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									{/* Hostel Block */}
									<Controller
										name="hostel_block"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel>Hostel Block</FieldLabel>
												<Input
													type="number"
													{...field}
													onChange={(e) =>
														field.onChange(Number(e.target.value))
													}
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</FieldGroup>
							</FieldGroup>
						</FieldSet>
					</form>
				</CardContent>

				<CardFooter>
					<FieldSet className="w-full">
						<Field orientation="horizontal" className="grid w-full grid-cols-3">
							<Button variant={"destructive"} onClick={handleLogout}>
								Logout
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => form.reset()}
							>
								Reset
							</Button>

							<Button type="submit" form="complete-cook-profile">
								Submit
							</Button>
						</Field>
					</FieldSet>
				</CardFooter>
			</Card>
		</div>
	);
}
