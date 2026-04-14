import { handleApiError } from "../auth/auth";
import { api } from "../helpers";

export const menuUrl = "api/menu";

export const getItem = async (id: number) => {
	try {
		const resp = await api.get(`${menuUrl}/items/${id}`);
		return resp.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
};

export const getAllItems = async () => {
	try {
		const resp = await api.get(`${menuUrl}/items/`);
		return resp.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
};
export const getWeeklyMenu = async () => {
	try {
		const resp = await api.get(`${menuUrl}/weekly-menu/list/`);
		return resp.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
};

export const getGuestMeals = async () => {
	try {
		const resp = await api.get(`${menuUrl}/guest-meals/`);
		console.log(resp.data);
		return resp.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
};
