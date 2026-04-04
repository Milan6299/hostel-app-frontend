import { type ReactElement } from "react";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonCard(): ReactElement {
	return (
		<div className="grid w-full sm:max-w-lg gap-7">
			<div className="flex flex-col gap-3">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-8 w-full" />
			</div>
			<div className="flex flex-col gap-3">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-8 w-full" />
			</div>
		</div>
	);
}
