"use client";

import { sidebarConfig } from "@/lib/sidebar-config";
import { useNoticeStore } from "@/lib/store/useNoticeStore";
import { Role } from "@/lib/types";
import { BellDot } from "lucide-react";
import Link from "next/link";

export default function MobileDock({ role }: { role: Role }) {
	const menuItems = sidebarConfig[role];
	const { unreadCount } = useNoticeStore();
	return (
		<div className="fixed bottom-0 left-0 z-50 w-full h-20 bg-background flex justify-center gap-4 items-center p-4 border-t sm:hidden">
			{menuItems.map((item) => (
				<Link
					href={item.url}
					key={item.url}
					className="flex flex-col items-center justify-center gap-2"
				>
					{item.title === "Notices" && unreadCount !== 0 ? (
						<BellDot className="w-6 h-6 text-destructive" />
					) : (
						<item.icon className={`w-6 h-6 relative`} />
					)}

					<div className="text-xs">{item.title}</div>
				</Link>
			))}
		</div>
	);
}
