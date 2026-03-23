import { LoginSchema } from "@/app/login/login-form";
import { api } from "../helpers";
import { CompleteStudentProfileSchema } from "@/app/complete-profile/[role]/StudentForm";
import { SignupSchema } from "@/app/signup/signup-form";

type ApiError = {
	status: number;
	error: string;
	code?: string;
	role?: string;
};

export const authUrl = "api/accounts/";

// Reusable error normalizer
function handleApiError(err: any): ApiError {
	return {
		status: err?.response?.status,
		error: err?.response?.data?.error || "Something went wrong",
		code: err?.response?.data?.code,
		role: err?.response?.data?.role,
	};
}

// Signup
export async function signupUser(data: SignupSchema) {
	try {
		const response = await api.post(`${authUrl}signup/`, data);
		return response.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
}

// Login
export async function loginUser(data: LoginSchema) {
	try {
		const response = await api.post(`${authUrl}login/`, data);
		return response.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
}

// Logout

export async function logoutUser() {
	try {
		const resp = await api.post(`${authUrl}logout/`);
		return resp.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
}
// Complete Profile
export async function completeProfile(data: CompleteStudentProfileSchema) {
	try {
		const response = await api.post(`${authUrl}complete_profile/`, data);
		return response.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
}

// Authenticate
export async function checkAuth() {
	try {
		const response = await api.get(`${authUrl}authenticate/`);
		return response.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
}

// Get Profile
export async function getProfile() {
	try {
		const response = await api.get(`${authUrl}profile/`);
		return response.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
}
