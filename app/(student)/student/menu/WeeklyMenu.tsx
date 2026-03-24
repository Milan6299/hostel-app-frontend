"use client";
import { SkeletonForm } from "@/components/skeleton-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getWeeklyMenu } from "@/lib/api/menu";
import { Star } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";

export default function WeeklyMenu(): ReactElement {
	const [menu, setMenu] = useState<[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
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

	if (!menu) return <SkeletonForm />;
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Weekly Menu</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4 md:gap-8 w-full">
					{menu?.map((item) => (
						<div key={item.day_name} className="grid gap-4 w-full ">
							<Badge className="text-lg">{item.day_name}</Badge>
							<div className="grid gap-4 md:gap-8 md:grid-cols-2">
								{item.meals.map((meal) => (
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
								))}
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
