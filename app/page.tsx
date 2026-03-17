import { redirect } from "next/navigation";

export default async function Home() {
	// const user = getCurrentUser();
	const user = { role: null };

	if (!user.role) redirect("/signup");

	if (user.role === "student") redirect("/student");
	if (user.role === "cook") redirect("/cook");
	if (user.role === "admin") redirect("/admin");

	redirect("/login");
}
