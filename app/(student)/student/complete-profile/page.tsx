"use client";
import { api } from "@/lib/helpers";
// import { api } from "@/lib/helpers";
import { useEffect, useState } from "react";

interface User {
	role: string;
	email: string;
	username: string;
}

export default function CompleteProfile() {
	const [user, setUser] = useState<User | null>(null);
	async function get_profile_data() {
		await api
			.get("/api/get_student_profile/")
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}
	useEffect(() => {
		get_profile_data();
	}, []);
	return <div>{user?.user.role} Profile Form</div>;
}
