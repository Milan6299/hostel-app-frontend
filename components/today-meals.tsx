"use client";

import { useEffect, useState } from "react";
import MealCard from "./meal-card";
import OptOutModal from "./opt-out-modal";
import SkeletonCard from "./skeleton-card";
import { api } from "@/lib/helpers";
import { getGuestMeals } from "@/lib/api/menu";

export function getISTDate(offsetDays = 0) {
	const d = new Date();
	d.setDate(d.getDate() + offsetDays);
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Kolkata",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(d);
}

export default function TodayMeals() {
	const [meals, setMeals] = useState<any[]>([]);
	const [guestMeals, setGuestMeals] = useState<any[]>([]);
	const [optOutMeal, setOptOutMeal] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const today = getISTDate(0);
	const tomorrow = getISTDate(1);

	const fetchMeals = async () => {
		try {
			// Note: Ensure your backend maps this route to your `get_meal_status` view,
			// as your `get_today_meals` view doesn't take start/end params!
			const res = await api.get(
				`/api/menu/meals/status/?start=${today}&end=${tomorrow}`,
			);

			const fetchedMeals = res.data.sort() || [];

			setMeals(fetchedMeals);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
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

	// Group meals by date
	const todayMealsList = meals.filter((m) => m.date === today);
	const tomorrowMealsList = meals.filter((m) => m.date === tomorrow);
	return (
		<div className="space-y-8">
			{loading ? (
				<div className="space-y-4">
					<SkeletonCard />
					<SkeletonCard />
				</div>
			) : (
				<>
					{/* TODAY SECTION */}
					<section className="grid gap-4 ">
						<div className="">
							<h2 className="text-xl font-bold mb-4 pb-2">Today's Menu</h2>
							<div className="flex grow flex-col md:flex-row gap-4">
								{todayMealsList.length === 0 ? (
									<SkeletonCard />
								) : (
									todayMealsList.map((meal: any) => (
										<MealCard
											key={`${meal.date}-${meal.meal_type}`}
											meal={meal}
											mealType={meal.meal_type}
											guestMeals={guestMeals}
											onOptOut={() => setOptOutMeal(meal)}
											onRefresh={async () => {
												await fetchMeals();
												await fetchGuestMeals();
											}}
										/>
									))
								)}
							</div>
						</div>

						<div>
							<h2 className="text-xl font-bold mb-4 pb-2">
								Plan for Tomorrow{" "}
							</h2>
							<div className="flex flex-col md:flex-row gap-4">
								{tomorrowMealsList.length === 0 ? (
									<p className="text-muted-foreground text-sm">
										No meals scheduled for tomorrow.
									</p>
								) : (
									tomorrowMealsList.map((meal: any) => (
										<MealCard
											key={`${meal.date}-${meal.meal_type}`}
											meal={meal}
											mealType={meal.meal_type}
											guestMeals={guestMeals}
											onOptOut={() => setOptOutMeal(meal)}
											onRefresh={async () => {
												await fetchMeals();
												await fetchGuestMeals();
											}}
										/>
									))
								)}
							</div>
						</div>
					</section>
				</>
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
