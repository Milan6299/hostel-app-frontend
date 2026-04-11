"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/helpers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HistoryCard = ({ meal }: any) => {
	return (
		<Card>
			<CardHeader className="flex justify-between">
				<div>
					<span className="font-semibold uppercase">{meal.meal_type}</span>
					<p className="text-sm text-muted-foreground">{meal.date}</p>
				</div>

				<div className="flex gap-2">
					<Badge>{meal.food_type}</Badge>
					<Badge variant={meal.status === "active" ? "default" : "destructive"}>
						{meal.status}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-2">
				<p className="text-sm">
					{meal.items.map((i: any) => i.name).join(", ")}
				</p>

				{/* Guest Meal */}
				{meal.guest_meal && (
					<div className="text-sm text-muted-foreground">
						Guest → Veg: {meal.guest_meal.veg_count} | Non-Veg:{" "}
						{meal.guest_meal.nonveg_count} | ₹{meal.guest_meal.total_price}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default function MealHistory() {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchHistory = async () => {
		try {
			const res = await api.get("/api/menu/history/");
			setData(res.data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchHistory();
	}, []);

	if (loading) return <p>Loading...</p>;

	if (data.length === 0) return <p>No history found</p>;

	return (
		<div className="space-y-4">
			{data.map((meal) => (
				<HistoryCard key={meal.id} meal={meal} />
			))}
		</div>
	);
}
