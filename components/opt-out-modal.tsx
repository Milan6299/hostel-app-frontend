"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/helpers";
import { getISTDate } from "./today-meals";

function getTomorrowDate() {
	const d = new Date();
	d.setDate(d.getDate() + 1);
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Kolkata",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(d);
}

const OptOutModal = ({ meal, onClose, onSuccess }: any) => {
	const today = getISTDate();
	const tomorrow = getTomorrowDate();

	const [endDate, setEndDate] = useState(tomorrow);
	const [saving, setSaving] = useState(false);

	const handleTodayOptOut = async () => {
		try {
			setSaving(true);

			await api.post("/api/menu/opt-outs/", {
				start_date: today,
				end_date: today,
				meal_type: meal.meal_type,
			});

			onSuccess?.();
		} catch (err: any) {
			console.error(err?.response?.data || err);
		} finally {
			setSaving(false);
		}
	};

	const handleFutureOptOut = async () => {
		try {
			setSaving(true);

			await api.post("/api/menu/opt-outs/", {
				start_date: tomorrow,
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
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
			<div className="bg-card p-6 rounded-xl w-full max-w-md space-y-5">
				<h2 className="text-lg font-semibold">Opt out of meals</h2>

				{/* TODAY */}
				<div>
					<Button
						variant="destructive"
						onClick={handleTodayOptOut}
						disabled={saving || !meal.can_modify}
						className="w-full"
					>
						Opt Out Today ({meal.meal_type})
					</Button>

					{!meal.can_modify && (
						<p className="text-xs text-red-400 mt-1">Cutoff passed for today</p>
					)}
				</div>

				{/* FUTURE */}
				<div className="border-t pt-4 space-y-2">
					<input
						type="date"
						value={endDate}
						min={tomorrow}
						onChange={(e) => setEndDate(e.target.value)}
						className="w-full p-2 border rounded"
					/>

					<Button
						onClick={handleFutureOptOut}
						disabled={saving}
						className="w-full"
					>
						Opt Out from Tomorrow → {endDate}
					</Button>
				</div>

				<Button variant="outline" onClick={onClose} className="w-full">
					Close
				</Button>
			</div>
		</div>
	);
};

export default OptOutModal;
