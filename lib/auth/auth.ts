import { api } from "../helpers";

export async function getCurrentUser() {
	try {
		const response = api.get(`/api/authenticate/`);
		return response;
	} catch (err) {
		console.log(err);
	}
	// return { role: "student" };
}
