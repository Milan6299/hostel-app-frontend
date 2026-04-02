"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";

import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
	FieldTitle,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import SelectionMenu from "@/components/selection-menu";
import { useEffect, useState } from "react";
import { updateProfile } from "@/lib/api/profile";
import { getProfile } from "@/lib/auth/auth";
import { Button } from "@/components/ui/button";
import { SkeletonForm } from "@/components/skeleton-form";

export type StudentProfileSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
	first_name: z.string().min(1),
	last_name: z.string().min(1),
	roll_no: z.string().min(3),
	department: z.string().min(2),
	room_no: z.number().min(1),
	phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
	year: z.number().min(1).max(5),
	hostel_block: z.number().min(1),
	hostel_type: z.enum(["boys", "girls"]),
});

const StudentProfile = () => {
	const [proData, setProData] = useState<StudentProfileSchema | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	const getData = async () => {
		setIsLoading(true);
		await getProfile()
			.then((resp) => {
				console.log(resp);
				toast("Data GET success!");
				setProData(resp);
			})
			.catch((err) => {
				const { status } = err || {};
				console.log(status);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		getData();
	}, []);
	useEffect(() => {
		if (proData) {
			form.reset({
				first_name: proData.first_name || "",
				last_name: proData.last_name || "",
				roll_no: proData.roll_no || "",
				department: proData.department || "",
				room_no: proData.room_no || 1,
				phone: proData.phone || "",
				year: proData.year || 1,
				hostel_type: proData.hostel_type || "boys",
				hostel_block: proData.hostel_block || 1,
			});
		}
	}, [proData]);

	const form = useForm<StudentProfileSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			roll_no: "",
			department: "",
			room_no: 1,
			phone: "",
			year: 1,
			hostel_type: "boys",
			hostel_block: 1,
		},
	});

	async function onSubmit(formdata: StudentProfileSchema) {
		setIsLoading(true);
		try {
			const response = await updateProfile(formdata);

			if (response) {
				toast(`${response.message}`);
			}
		} catch (err: any) {
			const { status, code, error } = err || {};

			console.log(err);

			if (status === 404) {
				toast(error);
				return;
			}

			if (code === "WAITING") {
				router.push("/waiting");
				return;
			}

			// fallback
			toast(error || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	}

	if (proData === null) {
		return <SkeletonForm />;
	}
	return (
		<div>
			<div className="w-full grid gap-4 sm:gap-8 mx-auto ">
				<div>
					<form id="student-profile" onSubmit={form.handleSubmit(onSubmit)}>
						<FieldSet disabled={isLoading} className="grid ">
							<FieldGroup>
								{/* 
							  <FieldTitle className="">Personal Info</FieldTitle>
                First Name */}

								<FieldTitle className="text-xl">Personal Details</FieldTitle>
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
								</FieldGroup>
							</FieldGroup>
							<FieldGroup>
								<FieldTitle className="text-xl">Education Details</FieldTitle>
								<FieldGroup className="grid sm:grid-cols-3">
									{/* Roll Number */}
									<Controller
										name="roll_no"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel>Roll Number</FieldLabel>
												<Input {...field} placeholder="Roll Number" />
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									{/* Department */}
									<Controller
										name="department"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel>Department</FieldLabel>
												<Input {...field} placeholder="Department" />
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									{/* Year */}
									<Controller
										name="year"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel>Year</FieldLabel>
												{
													// <Input
													// 	type="number"
													// 	{...field}
													// 	onChange={(e) =>
													// 		field.onChange(e.target.valueAsNumber)
													// 	}
													//
													// />
												}
												<SelectionMenu
													placeholder="Select Year"
													items={[
														{ value: "1", label: "1st" },
														{ value: "2", label: "2nd" },
														{ value: "3", label: "3rd" },
														{ value: "4", label: "4th" },
														{ value: "5", label: "5th" },
													]}
													value={String(field.value)}
													onChange={(val) => field.onChange(Number(val))}
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
								<FieldTitle className="text-xl">Hostel Details</FieldTitle>
								<FieldGroup className="grid sm:grid-cols-4">
									{/* Room */}
									<Controller
										name="room_no"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel>Room Number</FieldLabel>
												<Input
													type="number"
													{...field}
													placeholder="Room Number"
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

							<FieldGroup className="sticky w-full bottom-4 sm:flex sm:max-w-32">
								<Button
									type="submit"
									className="flex gap-2 w-full sm:w-auto items-center"
								>
									Save Profile
									{
										// <UserRoundPen />
									}
								</Button>
							</FieldGroup>
						</FieldSet>
					</form>
				</div>
			</div>
		</div>
	);
};

export default StudentProfile;
