import { api } from "@/lib/helpers";
import { redirect } from "next/navigation";

export default async function Home() {
	// const user = getCurrentUser();
	// const user = { role: null };
	try {
		const resp = await api.get("/api/authenticate/");
		const user = resp.data;
		console.log(resp);

		if (!user.role) redirect("/login");

		if (user.role === "student") redirect("/student");
		if (user.role === "cook") redirect("/cook");
		if (user.role === "admin") redirect("/admin");
	} catch (err) {
		console.error(err);
		redirect("/login");
	}
}
