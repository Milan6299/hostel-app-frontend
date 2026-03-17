"use client";
import { type ReactElement } from "react";
import { useEffect } from "react";
import { api } from "@/lib/helpers";

export default function Providers({
	children,
}: {
	children: React.ReactNode;
}): ReactElement {
	useEffect(() => {
		const init = async () => {
			try {
				await api.get("/api/csrf/");
				// const success = await api.get("/api/csrf/");
				// if (success) alert("CSRF recieved successfully!");
			} catch (err) {
				console.error("CSRF init failed", err);
				alert("CSRF initialization failed!");
			}
		};

		init();
	}, []);

	return <>{children}</>;
}
