"use client";
import { api, getCookie } from "@/lib/helpers";
// import axios from "axios";
import { useEffect } from "react";

const SignUpForm = ({ role }: { role: string }) => {
	// const csrftoken = getCookie("csrftoken");
	console.log(role);
	const initiateSignup = async () => {
		try {
			const response = await api.get("/accounts/signup/");
			console.log("initial response: ", response);
			// const csrftoken = getCookie("csrftoken");
			// console.log(csrftoken);
			getData();
		} catch (err) {
			alert(err);
		}
	};
	const getData = async () => {
		try {
			const response = await api.post(
				"/api/signup/",
				// headers: {
				// 	"Content-Type": "application/x-www-form-urlencoded",
				// 	"X-CSRFToken": csrftoken,
				// },
				{
					email: "maheshchnayak2003@gmail.com",
					username: "mahesh2003",
					password: "alokiluvu",
					role: role,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				},
			);
			console.log("response: ", response);
			if (response.data.profile_complete === false) {
				alert("navigating to profile_complete page");
			}
			// alert(response.status);
		} catch (err: any) {
			alert(err.response.data.error);
		}
	};
	useEffect(() => {
		initiateSignup();
	}, []);
	return <div>Sign up</div>;
};

export default SignUpForm;
