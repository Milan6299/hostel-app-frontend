import { api } from "@/lib/helpers";

export async function getProfile() {
	try {
		const resp = await api.get("/api/profile");
		return resp.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
}
