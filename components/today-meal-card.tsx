"use client";

import { useState } from "react";
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

const TodayMealCard = ({
	meal,
	mealType,
	guestMeals,
	onOptOut,
	onRefresh,
}: any) => {
	const [loading, setLoading] = useState(false);

	// This will now work successfully because meal.id is an integer!
	const guestMealForThis = guestMeals.find((g: any) => g.meal === meal.id);

	const isLocked = !meal.can_modify;

	const canShowVeg = meal.available_options.includes("veg");
	const canShowNonVeg = meal.available_options.includes("nonveg");

	const selectedType = meal.selected_food;

	const handleSelect = async (type: "veg" | "nonveg") => {
		if (isLocked) return;

		try {
			setLoading(true);

			await api.post("/api/menu/select-meal/", {
				date: meal.date,
				meal_type: meal.meal_type,
				food_type: type,
			});

			await onRefresh();
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleRejoin = async () => {
		if (isLocked) return;

		try {
			await api.delete(`/api/menu/opt-outs/${meal.opt_out_id}/`);
			await onRefresh();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Card className="transition">
			<CardHeader className="flex justify-between items-center">
				<span className="font-semibold uppercase">{mealType}</span>

				<div className="flex gap-2 items-center">
					<Badge>{meal.is_special ? "Special" : "Normal"}</Badge>

					<Badge variant={selectedType === "veg" ? "success" : "destructive"}>
						{selectedType === "veg" ? "Veg" : "Non-Veg"}
					</Badge>

					{meal.is_override && canShowVeg && canShowNonVeg && (
						<Badge variant="secondary">Override</Badge>
					)}

					{!meal.is_active && <Badge variant="destructive">Opted Out</Badge>}
				</div>
			</CardHeader>

			<CardContent className="space-y-3">
				{/* FOOD SELECT */}
				{canShowVeg && canShowNonVeg && (
					<div className="flex gap-2">
						<Button
							variant={selectedType === "veg" ? "default" : "outline"}
							onClick={() => handleSelect("veg")}
							disabled={loading || isLocked}
						>
							Veg
						</Button>

						<Button
							variant={selectedType === "nonveg" ? "default" : "outline"}
							onClick={() => handleSelect("nonveg")}
							disabled={loading || isLocked}
						>
							Non-Veg
						</Button>
					</div>
				)}

				<p className="text-sm text-muted-foreground">
					{selectedType === "nonveg" && meal.nonveg_items?.length > 0
						? meal.nonveg_items.join(", ")
						: meal.veg_items?.join(", ") || meal.items.join(", ")}
				</p>

				<p>
					Status:{" "}
					<span className={meal.is_active ? "text-green-500" : "text-red-500"}>
						{meal.is_active ? "Active" : "Opted Out"}
					</span>
				</p>

				{/* CUTOFF */}
				{isLocked && (
					<p className="text-xs text-red-400">
						{meal.meal_type === "lunch"
							? "Lunch closed at 12 AM (previous day)"
							: "Dinner closed at 4 PM today"}
					</p>
				)}

				{/* GUEST */}
				{meal.is_active && !isLocked && (
					<GuestMealControl
						meal={meal}
						canShowVeg={canShowVeg}
						canShowNonVeg={canShowNonVeg}
						initialVeg={guestMealForThis?.veg_count || 0}
						initialNonveg={guestMealForThis?.nonveg_count || 0}
						onSuccess={onRefresh}
					/>
				)}
			</CardContent>

			<CardFooter className="flex justify-end">
				{meal.is_active ? (
					<Button
						variant="destructive"
						onClick={() => onOptOut(meal)}
						disabled={isLocked}
					>
						Opt Out
					</Button>
				) : (
					<Button variant="default" onClick={handleRejoin} disabled={isLocked}>
						Rejoin
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default TodayMealCard;
