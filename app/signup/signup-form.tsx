"use client";
import { api } from "@/lib/helpers";
import { useEffect } from "react";

const SignUpForm = ({ role }: { role: string }) => {
	// const csrftoken = getCookie("csrftoken");
	const getData = async () => {
		try {
			const response = await api.post(
				"/api/signup/",
				{
					email: "",
					username: "",
					password1: "",
					password2: "",
					role: role,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				},
			);
			console.log("response: ", response);
			alert("Check your mail for verification message.");
			// if (response.data.profile_complete === false) {
			// 	alert("navigating to profile_complete page");
			// }
			// alert(response.status);
		} catch (err: unknown) {
			alert(err?.response.data.error);
		}
	};
	useEffect(() => {
		getData();
	}, []);
	return <div>Sign up</div>;
};

export default SignUpForm;
