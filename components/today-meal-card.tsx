"use client";
import { Check, Circle, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { useState } from "react";

const TodayMealCard = () => {
	const [preference, setPreference] = useState<boolean>(true);
	const currentMeal = {
		type: "Lunch",
		nvegitem: "Rice, Dal, Chicken, Salad",
		vegitem: "Rice, Dal, Paneer, Salad",
		special: true,
	};
	return (
		<Card className="">
			<CardContent className="py-0">
				<CardDescription className="space-y-2">
					<h2 className="flex justify-between font-bold text-lg">
						<strong className="text-foreground">{currentMeal.type}</strong>

						<Badge variant={"default"}>
							{currentMeal.special ? "Special" : "Normal"}
						</Badge>
					</h2>
					<p className="mt-2">
						{preference ? currentMeal.nvegitem : currentMeal.vegitem}
					</p>
				</CardDescription>
			</CardContent>
			<CardFooter className="flex flex-row-reverse gap-1 md:gap-2 mt-auto ml-auto">
				<Button variant={"success"}>
					<Check />
				</Button>
				<Button variant={"destructive"}>
					<X />
				</Button>
				<Button
					onClick={() => setPreference(!preference)}
					variant={"secondary"}
				>
					<Circle
						className={`${preference ? "bg-destructive" : "bg-success"} text-secondary rounded-full`}
					/>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default TodayMealCard;
