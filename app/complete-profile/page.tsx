"use client";
import { getCurrentUser } from "@/lib/auth/auth";
// import { api } from "@/lib/helpers";
import { useEffect, useState, type ReactElement } from "react";

interface User {
	role: string;
	email: string;
	username: string;
}

export default function CompleteProfile(): ReactElement {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const response = getCurrentUser();
		if (response) {
			setUser(response);
			console.log(response);
		}
	}, []);
	return <div>{user?.role} Profile Form</div>;
}
