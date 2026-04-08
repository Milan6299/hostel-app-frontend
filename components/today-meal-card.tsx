"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GuestMealControl from "./guest-meal-control";
import { api } from "@/lib/helpers";

const TodayMealCard = ({ meal, guestMeals, onOptOut, onRefresh }: any) => {
	const guestMealForThis = guestMeals.find((g: any) => g.meal === meal.id);

	const handleRejoin = async () => {
		try {
			await api.delete(`/api/menu/opt-outs/${meal.opt_out_id}/`);
			onRefresh();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Card>
			<CardHeader className="flex justify-between">
				<span className="font-semibold uppercase">{meal.meal_type}</span>
				<Badge>{meal.is_special ? "Special" : "Normal"}</Badge>
			</CardHeader>

			<CardContent className="space-y-3">
				<p className="text-sm text-muted-foreground">
					{meal.items.map((i: any) => i.name).join(", ")}
				</p>

				<p>
					Status:{" "}
					<span className={meal.is_active ? "text-green-500" : "text-red-500"}>
						{meal.is_active ? "Active" : "Opted Out"}
					</span>
				</p>

				{/* ✅ Guest Meal Section */}
				<GuestMealControl
					meal={meal}
					initialVeg={guestMealForThis?.veg_count || 0}
					initialNonveg={guestMealForThis?.nonveg_count || 0}
					onSuccess={onRefresh}
				/>
			</CardContent>

			<CardFooter className="flex justify-end">
				{meal.is_active ? (
					<Button variant="destructive" onClick={onOptOut}>
						Opt Out
					</Button>
				) : (
					<Button variant="success" onClick={handleRejoin}>
						Rejoin
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default TodayMealCard;
