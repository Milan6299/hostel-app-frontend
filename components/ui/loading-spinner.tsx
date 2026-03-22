"use client";

import { Spinner } from "@/components/ui/spinner"; // adjust path

type Props = {
	isLoading: boolean;
};

export default function LoadingSpinner({ isLoading }: Props) {
	if (!isLoading) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 ">
			<div className="flex flex-col items-center gap-2">
				<Spinner className="size-16 animate-spin text-white" />
			</div>
		</div>
	);
}
