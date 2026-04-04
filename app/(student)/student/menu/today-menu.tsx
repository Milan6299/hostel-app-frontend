"use client";
import SkeletonCard from "@/components/skeleton-card";
import { SkeletonForm } from "@/components/skeleton-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getWeeklyMenu } from "@/lib/api/menu";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactElement } from "react";

export default function TodayMenuCard(): ReactElement {
	const [menu, setMenu] = useState<[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const getMenu = async () => {
		setIsLoading(true);
		await getWeeklyMenu()
			.then((resp) => {
				if (resp) console.log(resp);
				setMenu(resp);
			})
			.catch((err) => {
				const { status } = err;
				console.log(status);
			})
			.finally(() => setIsLoading(false));
	};
	useEffect(() => {
		getMenu();
	}, []);

	const day = (new Date().getDay() + 6) % 7;
	console.log(day);
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl ">Today's Menu</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<SkeletonCard />
				) : (
					<div className="grid gap-4 md:gap-8 ">
						{menu
							?.filter((m) => m.day_index === day)
							.map((item) =>
								item.meals.map((meal) => (
									<div key={meal.id} className="grid gap-4">
										<div className="grid items-center gap-4 ">
											<div className="flex w-full gap-2">
												<div>{meal.meal_type.toUpperCase()}</div>
												<Badge
													className={`${meal.food_type === "veg" ? "bg-success" : "bg-destructive"} h-fit text-foreground w-fit p-1 rounded-full `}
												>
													{meal.food_type.toUpperCase()}
												</Badge>
												<div className="ml-auto">&#8377;{meal.price}</div>
											</div>
										</div>
										<div className="flex justify-between gap-4">
											<div className="flex gap-2 flex-wrap">
												{meal.items.map((i) => (
													<span key={i.name + i.id}>{i.name}</span>
												))}
											</div>
											{meal.is_special && (
												<Badge className="bg-info h-fit text-foreground">
													<Star />
													Special
												</Badge>
											)}
										</div>
									</div>
								)),
							)}
					</div>
				)}
			</CardContent>
			<CardFooter className="mt-auto ml-auto">
				<Link href={"/student/menu"}>
					<Button>View Weekly</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
