"use client";

import { Button } from "@/components/ui/button";
import { useNoticeStore } from "@/lib/store/useNoticeStore";
import { type ReactElement } from "react";

export default function MarkAllAsRead(): ReactElement | null {
	const { unreadCount, markAllAsRead } = useNoticeStore();

	return (
		<div className="flex items-center justify-between p-2">
			<h2 className="text-xl font-bold">Notices</h2>
			{unreadCount !== 0 && (
				<Button variant="info" size="sm" onClick={() => markAllAsRead()}>
					Mark all as read
				</Button>
			)}
		</div>
	);
}
