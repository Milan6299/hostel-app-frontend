import { StudentProfileSchema } from "@/app/(student)/student/profile/page";
import { api } from "@/lib/helpers";
import { authUrl, handleApiError } from "../auth/auth";
import { CompleteStudentProfileSchema } from "@/app/complete-profile/[role]/StudentForm";
import { CompleteCookProfileSchema } from "@/app/complete-profile/[role]/CookForm";
import { CookProfileSchema } from "@/app/(cook)/cook/profile/CookProfile";

export async function getProfile() {
	try {
		const resp = await api.get(`${authUrl}profile/`);
		return resp.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export async function completeProfile(
	data: CompleteStudentProfileSchema | CompleteCookProfileSchema,
) {
	try {
		const response = await api.post(`${authUrl}complete_profile/`, data);
		return response.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
}

export async function updateProfile(
	data: StudentProfileSchema | CookProfileSchema,
) {
	try {
		const resp = await api.patch(`${authUrl}update_profile/`, data);
		console.log(resp.data);
		return resp.data;
	} catch (err) {
		console.log(err.resp.data);
		throw err;
	}
}
