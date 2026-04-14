"use client";
import { type ReactElement } from "react";
import { useEffect } from "react";
import { api } from "@/lib/helpers";
import { authUrl } from "@/lib/auth/auth";
import { useNoticeStore } from "@/lib/store/useNoticeStore";

export function NoticeProvider({
	children,
}: {
	children: React.ReactNode;
}): ReactElement {
	const { fetchUnreadCount } = useNoticeStore();
	useEffect(() => {
		const fetchNotice = async () => {
			try {
				await fetchUnreadCount();
			} catch (err) {
				console.error("Failed!", err);
				alert("Unable to fetch Notices!");
			}
		};

		fetchNotice();
	}, []);

	return <>{children}</>;
}
export default function CSRFProvider({
	children,
}: {
	children: React.ReactNode;
}): ReactElement {
	useEffect(() => {
		const init = async () => {
			try {
				await api.get(`${authUrl}csrf/`);
			} catch (err) {
				console.error("CSRF init failed", err);
				alert("CSRF initialization failed!");
			}
		};

		init();
	}, []);

	return <>{children}</>;
}
