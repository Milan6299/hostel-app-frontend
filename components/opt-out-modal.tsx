"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/helpers";
import { Separator } from "./ui/separator";

const OptOutModal = ({ meal, onClose, onSuccess }: any) => {
	// Pull the exact date directly from the meal data the backend gave us
	const mealDate = meal.date;

	// Default the end date for a range opt-out to the same date
	const [endDate, setEndDate] = useState(mealDate);
	const [saving, setSaving] = useState(false);

	const handleSingleMealOptOut = async () => {
		try {
			setSaving(true);

			await api.post("/api/menu/opt-outs/", {
				start_date: mealDate,
				end_date: mealDate,
				meal_type: meal.meal_type,
			});

			onSuccess?.();
		} catch (err: any) {
			console.error(err?.response?.data || err);
		} finally {
			setSaving(false);
		}
	};

	const handleRangeOptOut = async () => {
		try {
			setSaving(true);

			await api.post("/api/menu/opt-outs/", {
				start_date: mealDate, // Starts from the card's date
				end_date: endDate,
				meal_type: "both",
			});

			onSuccess?.();
		} catch (err: any) {
			console.error(err?.response?.data || err);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
			<div className="bg-card p-8 rounded-xl w-full max-w-md space-y-4 shadow-lg">
				<h2 className="text-lg font-semibold">Opt out of meals</h2>

				{/* 2️⃣ RANGE OPT-OUT (Starts from Card Data) */}
				<div className=" space-y-4">
					<p className="text-sm font-medium text-muted-foreground">
						Or opt out for multiple days (Both Meals):
					</p>

					<div className="flex items-center gap-2">
						<span className="text-sm font-medium w-12">From:</span>
						<span className="text-sm text-muted-foreground">{mealDate}</span>
					</div>

					<div className="flex items-center gap-2 ">
						<span className="text-sm font-medium w-12">To:</span>
						<input
							type="date"
							value={endDate}
							min={mealDate} // Prevents picking a date before the card's date
							onChange={(e) => setEndDate(e.target.value)}
							className="flex-1 p-2 border rounded-md text-sm"
						/>
					</div>

					<Button
						variant="secondary"
						onClick={handleRangeOptOut}
						disabled={saving || endDate < mealDate}
						className="w-full"
					>
						Opt Out Range
					</Button>
				</div>
				<Separator />

				{/* 1️⃣ SPECIFIC MEAL (Uses Card Data) */}
				<div>
					<Button
						variant="destructive"
						onClick={handleSingleMealOptOut}
						disabled={saving || !meal.can_modify}
						className="w-full"
					>
						Opt Out of This Meal ({meal.meal_type})
					</Button>

					{!meal.can_modify && (
						<p className="text-xs text-red-500 mt-2 text-center">
							Cutoff passed for this meal
						</p>
					)}
				</div>
				<Button variant="outline" onClick={onClose} className="w-full">
					Cancel
				</Button>
			</div>
		</div>
	);
};

export default OptOutModal;
