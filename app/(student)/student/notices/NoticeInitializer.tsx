"use client";

import { useEffect } from "react";
import { useNoticeStore } from "@/lib/store/useNoticeStore";

export function NoticeInitializer() {
	const fetchNotices = useNoticeStore((state) => state.fetchNotices);

	useEffect(() => {
		fetchNotices();
	}, []);

	return null;
}
