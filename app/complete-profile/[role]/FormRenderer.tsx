"use client";
import { api } from "@/lib/helpers";
import { type ReactElement } from "react";

import { useEffect } from "react";
import { StudentProfileForm } from "./StudentForm";

export default function FormRenderer({ role }: { role: string }): ReactElement {
	const forms = [
		{
			role: "student",
			render: () => <StudentProfileForm />,
		},
		{
			role: "cook",
			render: () => <StudentProfileForm />,
		},
	];

	const currentForm = forms.filter((f) => f.role === role);

	// async function get_profile_data() {
	// 	const response = await api
	// 		.get(`/api/csrf/`)
	// 		.then((data) => console.log(data))
	// 		.catch((err) => console.log(err));
	// 	console.log(response);
	// }
	// useEffect(() => {
	// 	get_profile_data();
	// });

	return (
		<div>
			{
				// Development
				// 			<h1 className="text-center">{role} Profile Form</h1>
			}
			<div className="w-full p-4 flex justify-center">
				{currentForm[0].render()}
			</div>
		</div>
	);
}
