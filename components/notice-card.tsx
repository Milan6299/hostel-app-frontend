"use client";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { useNoticeStore } from "@/lib/store/useNoticeStore";
import SkeletonCard from "./skeleton-card";
import { useEffect } from "react";
import { Check } from "lucide-react";

const NoticesCard = () => {
	const { notices, isLoading, fetchNotices } = useNoticeStore();

	useEffect(() => {
		fetchNotices();
	}, [fetchNotices]);

	if (isLoading) return <SkeletonCard />;
	return (
		<Link href={"/student/notices/"}>
			<Card className="w-full">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Notices</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="space-y-2">
					{notices.map((notice) => (
						<div key={notice.id} className="flex justify-between text-sm gap-2">
							<span>{notice.title}</span>
							<Badge variant="default" className="max-h-max">
								{notice.is_seen ? <Check /> : "New"}
							</Badge>
						</div>
					))}
				</CardContent>
			</Card>
		</Link>
	);
};

export default NoticesCard;
