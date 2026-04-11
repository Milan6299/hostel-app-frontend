"use client";

import { useEffect, useState } from "react";
import TodayMealCard from "./today-meal-card";
import OptOutModal from "./opt-out-modal";
import SkeletonCard from "./skeleton-card";
import { api } from "@/lib/helpers";
import { getGuestMeals } from "@/lib/api/menu";

export function getISTDate() {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Kolkata",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(new Date());
}

export default function TodayMeals() {
	const [meals, setMeals] = useState<any[]>([]); // Changed to Array
	const [guestMeals, setGuestMeals] = useState<any[]>([]);
	const [optOutMeal, setOptOutMeal] = useState<any>(null);

	const today = getISTDate();

	const fetchMeals = async () => {
		try {
			// Calling your dedicated backend endpoint!
			const res = await api.get(`/api/menu/today/?date=${today}`);
			console.log(res);
			setMeals(res.data || []);
		} catch (err) {
			console.error(err);
		}
	};

	const fetchGuestMeals = async () => {
		try {
			const res = await getGuestMeals();
			setGuestMeals(res || []);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchMeals();
		fetchGuestMeals();
	}, []);

	return (
		<div className="space-y-4">
			{meals.length === 0 ? (
				<div>
					No meals found!
					<SkeletonCard />
				</div>
			) : (
				meals.map((meal: any) => (
					<TodayMealCard
						key={`${meal.date}-${meal.meal_type}-${meal.is_active}`}
						meal={meal}
						mealType={meal.meal_type} // Added this missing prop
						nonveg={meal.nonveg_items}
						veg={meal.veg_items}
						guestMeals={guestMeals}
						onOptOut={() => setOptOutMeal(meal)}
						onRefresh={async () => {
							await fetchMeals();
							await fetchGuestMeals();
						}}
					/>
				))
			)}

			{optOutMeal && (
				<OptOutModal
					meal={optOutMeal}
					onClose={() => setOptOutMeal(null)}
					onSuccess={async () => {
						setOptOutMeal(null);
						await fetchMeals();
						await fetchGuestMeals();
					}}
				/>
			)}
		</div>
	);
}
