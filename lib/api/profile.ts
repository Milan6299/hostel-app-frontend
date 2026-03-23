import { StudentProfileSchema } from "@/app/(student)/student/profile/page";
import { api } from "@/lib/helpers";
import { authUrl } from "../auth/auth";

export async function getProfile() {
	try {
		const resp = await api.get(`${authUrl}profile/`);
		return resp.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export async function updateProfile(data: StudentProfileSchema) {
	try {
		const resp = await api.patch(`${authUrl}update_profile/`, data);
		console.log(resp.data);
		return resp.data;
	} catch (err) {
		console.log(err.resp.data);
		throw err;
	}
}
