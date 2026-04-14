import { getCurrentUserServer } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await getCurrentUserServer();

	if (!user) {
		redirect("/login");
	}

	if (!user.profile_complete) {
		redirect(`/complete-profile/${user.role}`);
	}

	if (user.role === "student") redirect("/student");
	if (user.role === "cook") redirect("/cook");
	if (user.role === "admin") redirect("/admin");

	return null;
}
