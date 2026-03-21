import { LoginSchema } from "@/app/login/login-form";
import { api } from "../helpers";
import { StudentProfileSchema } from "@/app/complete-profile/[role]/StudentForm";
import { SignupSchema } from "@/app/signup/signup-form";

export async function loginUser(data: LoginSchema) {
	try {
		const response = await api.post("/api/login/", data);
		console.log(response);
		return response;
	} catch (err) {
		console.log(err);
	}
}

export async function signupUser(data: SignupSchema) {
	try {
		const response = await api.post("/api/signup/", data);
		return response;
	} catch (err) {
		console.log(err);
	}
}

export async function completeProfile(data: StudentProfileSchema) {
	try {
		const response = await api.post("/api/complete_profile/", data);
		return response;
	} catch (err) {
		console.log(err.response.data);
	}
}

export async function getCurrentUser() {
	try {
		const response = await api.get("/api/authenticate/");
		console.log("response", response.data);
		return response;
	} catch (err) {
		console.log(err);
	}
}
