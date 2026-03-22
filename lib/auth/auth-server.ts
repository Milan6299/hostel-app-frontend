import { cookies } from "next/headers";
import axios from "axios";

export async function getCurrentUserServer() {
	const cookieStore = await cookies();
	const sessionid = cookieStore.get("sessionid")?.value;
	const csrftoken = cookieStore.get("csrftoken")?.value;

	try {
		const response = await axios.get(
			"http://localhost:8000/api/authenticate/",
			{
				headers: {
					// Pass the cookies manually to Django
					Cookie: `sessionid=${sessionid}; csrftoken=${csrftoken}`,
					"X-CSRFToken": csrftoken || "",
				},
				withCredentials: true,
			},
		);
		return response.data;
	} catch (error) {
		return null; // This will trigger redirect to login
	}
}
