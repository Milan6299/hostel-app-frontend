"use client";

import { useEffect, useState } from "react";
import TodayMealCard from "./today-meal-card";
import OptOutModal from "./opt-out-modal";
import { api } from "@/lib/helpers";
import { getGuestMeals } from "@/lib/api/menu";
import SkeletonCard from "./skeleton-card";

export default function TodayMeals() {
	const [meals, setMeals] = useState<any[]>([]);
	const [guestMeals, setGuestMeals] = useState<any[]>([]);
	const [selectedMeal, setSelectedMeal] = useState<any>(null);

	const today = new Date().toISOString().split("T")[0];

	const fetchMeals = async () => {
		try {
			const [mealResp, statusResp] = await Promise.all([
				api.get(`/api/menu/meals/?start=${today}&end=${today}`),
				api.get(`/api/menu/meals/status/?start=${today}&end=${today}`),
			]);

			const mealsData = mealResp.data;
			const statusData = statusResp.data;

			const merged = mealsData.map((meal: any) => {
				const status = statusData.find((s: any) => s.meal_id === meal.id);

				return {
					...meal,
					is_active: status?.is_active ?? true,
				};
			});

			setMeals(merged);
		} catch (err) {
			console.error(err);
		}
	};

	const fetchGuestMeals = async () => {
		try {
			const res = await getGuestMeals();
			setGuestMeals(res);
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
				<SkeletonCard />
			) : (
				meals.map((meal) => (
					<TodayMealCard
						key={meal.id}
						meal={meal}
						guestMeals={guestMeals}
						onOptOut={() => setSelectedMeal(meal)}
						onRefresh={() => {
							fetchMeals();
							fetchGuestMeals();
						}}
					/>
				))
			)}

			{selectedMeal && (
				<OptOutModal
					meal={selectedMeal}
					onClose={() => setSelectedMeal(null)}
					onSuccess={() => {
						setSelectedMeal(null);
						fetchMeals();
					}}
				/>
			)}
		</div>
	);
}
