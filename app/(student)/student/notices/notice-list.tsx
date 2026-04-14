"use client";
import { useEffect } from "react";
import { useNoticeStore } from "@/lib/store/useNoticeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Calendar, Info } from "lucide-react";

export default function NoticeList() {
	const { notices, isLoading, fetchNotices, markAsRead } = useNoticeStore();

	useEffect(() => {
		fetchNotices();
	}, [fetchNotices]);

	if (isLoading) return <NoticeSkeleton />;

	return (
		<div className="space-y-4">
			{notices.map((notice) => (
				<Card
					key={notice.id}
					className={`relative transition-all ${!notice.is_seen ? "border-l-4 border-l-primary shadow-md" : "opacity-80"}`}
					onClick={() => !notice.is_seen && markAsRead(notice.id)}
				>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								{notice.priority === "high" ? (
									<AlertTriangle className="text-destructive w-5 h-5" />
								) : (
									<Info className="text-muted-foreground w-5 h-5" />
								)}
								<CardTitle className="text-lg font-bold">
									{notice.title}
								</CardTitle>
							</div>
							<PriorityBadge priority={notice.priority} />
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex gap-2 text-muted-foreground uppercase tracking-wider">
							<Calendar /> {new Date(notice.created_at).toLocaleDateString()}
						</div>
						<p className="text-sm mt-4 text-muted-foreground leading-relaxed">
							{notice.content}
						</p>
					</CardContent>

					{/* Blue dot for unread */}
					{!notice.is_seen && (
						<span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary" />
					)}
				</Card>
			))}
		</div>
	);
}

function PriorityBadge({ priority }: { priority: string }) {
	if (priority === "high")
		return <Badge variant="destructive">Emergency</Badge>;
	if (priority === "med") return <Badge variant="secondary">Important</Badge>;
	return <Badge variant="outline">General</Badge>;
}

function NoticeSkeleton() {
	return (
		<div className="space-y-4">
			{[1, 2, 3].map((i) => (
				<Skeleton key={i} className="h-32 w-full rounded-xl" />
			))}
		</div>
	);
}
