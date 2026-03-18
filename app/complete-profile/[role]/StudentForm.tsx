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
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { completeProfile } from "@/lib/auth/auth";
import SelectionMenu from "@/components/selection-menu";
import axios from "axios";

const formSchema = z.object({
	first_name: z.string().min(1),
	last_name: z.string().min(1),
	roll_no: z.string().min(3),
	department: z.string().min(2),
	room_no: z.string().min(1),
	phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
	year: z.number().min(1).max(5),
	hostel_block: z.number().min(1),
	hostel_type: z.enum(["boys", "girls"]),
});

export type StudentProfileSchema = z.infer<typeof formSchema>;

export function StudentProfileForm() {
	const router = useRouter();

	const form = useForm<StudentProfileSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			roll_no: "",
			department: "",
			room_no: "",
			phone: "",
			year: 1,
			hostel_type: "boys",
			hostel_block: 1,
		},
	});

	async function onSubmit(formdata: StudentProfileSchema) {
		try {
			const response = await completeProfile(formdata);

			if (response) {
				router.push("/student");
			}
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				const resp = err.response?.data;

				console.error(resp?.code);

				if (resp?.code === "ALREADY_EXISTS") {
					router.push("/login");
				}
			}
		}
		toast("Submission Successful!", {
			// description: (
			// 	<pre className="bg-code text-code-foreground mt-2 w-100 rounded-md p-4">
			// 		<code>{JSON.stringify(formdata, null, 2)}</code>
			// 	</pre>
			// ),
			position: "bottom-right",
		});
	}

	return (
		<Card className="w-full sm:min-w-md sm:max-w-lg">
			<CardHeader>
				<CardTitle>Complete Student Profile</CardTitle>
				<CardDescription>Please fill in your hostel details</CardDescription>
			</CardHeader>

			<CardContent>
				<form id="student-profile" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						{/* First Name */}
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

						{/* Room */}
						<Controller
							name="room_no"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Room Number</FieldLabel>
									<Input {...field} placeholder="Room Number" />
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

						{/* Year */}
						<Controller
							name="year"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Year</FieldLabel>
									<Input
										type="number"
										{...field}
										onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
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

					<Button type="submit" form="student-profile">
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
