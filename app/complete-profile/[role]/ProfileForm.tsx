"use client";
import { api } from "@/lib/helpers";
import { type ReactElement } from "react";

import { useEffect, useState } from "react";

interface User {
	role: string;
	email: string;
	username: string;
}
export default function ProfileForm({ role }: { role: string }): ReactElement {
	async function get_profile_data() {
		const response = await api
			.get(`/api/get_profile/`)
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
		console.log(response);
	}
	useEffect(() => {
		get_profile_data();
	});
	return (
		<div>
			<h1>{role} Profile Form</h1>
			<div></div>
		</div>
	);
}
