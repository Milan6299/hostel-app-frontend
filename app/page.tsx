import { getCurrentUserServer } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await getCurrentUserServer();

	// 1. If no user, go to login
	if (!user) {
		redirect("/login");
	}

	// 2. If user exists but profile isn't done
	if (!user.profile_complete) {
		redirect(`/complete-profile/${user.role}`);
	}

	// 3. Role-based routing
	if (user.role === "student") redirect("/student");
	if (user.role === "cook") redirect("/cook");
	if (user.role === "admin") redirect("/admin");

	// Fallback
	return null;
}
