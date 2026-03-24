import { handleApiError } from "../auth/auth";
import { api } from "../helpers";
const menuUrl = "api/menu";

export const getWeeklyMenu = async () => {
	try {
		const resp = await api.get(`${menuUrl}/weekly-menu/`);
		return resp.data;
	} catch (err: any) {
		throw handleApiError(err);
	}
};
