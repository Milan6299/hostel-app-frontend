import { LoginSchema } from "@/app/login/login-form";
import { api } from "../helpers";
import { StudentProfileSchema } from "@/app/complete-profile/[role]/StudentForm";

export async function loginUser(data: LoginSchema) {
	try {
		const response = api.post("/api/login/", data);
		return response;
	} catch (err) {
		console.log(err);
	}
}

export async function completeProfile(data: StudentProfileSchema) {
	try {
		const response = api.post("/api/complete_profile/", data);
		return response;
	} catch (err) {
		console.log(err);
	}
}
export async function getCurrentUser() {
	try {
		const response = api.get("/api/authenticate/");
		return response;
	} catch (err) {
		console.log(err);
	}
}
