"use client";
import { type ReactElement } from "react";

import { StudentProfileForm } from "./StudentForm";
import { CookProfileForm } from "./CookForm";

export default function FormRenderer({ role }: { role: string }): ReactElement {
	const forms = [
		{
			role: "student",
			render: () => <StudentProfileForm />,
		},
		{
			role: "cook",
			render: () => <CookProfileForm />,
		},

		{
			role: "admin",
			render: () => <StudentProfileForm />,
		},
	];

	const currentForm = forms.filter((f) => f.role === role);
	if (!currentForm) console.log(currentForm);

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
