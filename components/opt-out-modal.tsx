"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/helpers";

const OptOutModal = ({ meal, onClose, onSuccess }: any) => {
	const today = new Date().toISOString().split("T")[0];

	const [endDate, setEndDate] = useState(today);
	const [mealType, setMealType] = useState(meal.meal_type);
	const [reason, setReason] = useState("leave");
	const [note, setNote] = useState("");

	const handleSubmit = async () => {
		try {
			await api.post(`/api/menu/opt-outs/`, {
				start_date: today,
				end_date: endDate,
				meal_type: mealType,
				reason,
				note,
			});

			onSuccess();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
			<div className="bg-card p-6 rounded-xl w-[350px] space-y-4">
				<h2 className="text-lg font-semibold">Opt Out</h2>

				<input
					type="date"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					className="w-full p-2 border rounded"
				/>

				<select
					value={mealType}
					onChange={(e) => setMealType(e.target.value)}
					className="w-full p-2 border rounded"
				>
					<option value="lunch">Lunch</option>
					<option value="dinner">Dinner</option>
					<option value="both">Both</option>
				</select>

				<select
					value={reason}
					onChange={(e) => setReason(e.target.value)}
					className="w-full p-2 border rounded"
				>
					<option value="leave">Leave</option>
					<option value="outing">Outing</option>
					<option value="sick">Sick</option>
					<option value="exam">Exam</option>
					<option value="other">Other</option>
				</select>

				<textarea
					placeholder="Note (optional)"
					value={note}
					onChange={(e) => setNote(e.target.value)}
					className="w-full p-2 border rounded"
				/>

				<div className="flex justify-end gap-2">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>Confirm</Button>
				</div>
			</div>
		</div>
	);
};

export default OptOutModal;
