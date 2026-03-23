import axios from "axios";

function getCookie(name: string) {
	let cookieValue = null;

	if (document.cookie && document.cookie !== "") {
		const cookies = document.cookie.split(";");

		for (let cookie of cookies) {
			cookie = cookie.trim();

			if (cookie.startsWith(name + "=")) {
				cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
				break;
			}
		}
	}

	return cookieValue;
}

export const api = axios.create({
	baseURL: "http://localhost:8000/",
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const csrftoken = getCookie("csrftoken");

	if (csrftoken) {
		config.headers["X-CSRFToken"] = csrftoken;
	}

	return config;
});
