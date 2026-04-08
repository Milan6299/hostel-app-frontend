"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/helpers";

const GuestMealControl = ({
	meal,
	initialVeg = 0,
	initialNonveg = 0,
	onSuccess,
}: any) => {
	const [veg, setVeg] = useState(initialVeg);
	const [nonveg, setNonveg] = useState(initialNonveg);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			await api.post("/api/menu/guest-meal/", {
				meal: meal.id,
				veg_count: veg,
				nonveg_count: nonveg,
			});

			onSuccess?.();
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-2">
			<p className="text-sm font-medium">Guest Meals</p>

			{/* VEG */}
			<div className="flex justify-between items-center">
				<span>Veg: {veg}</span>
				<div className="flex gap-2">
					<Button size="sm" onClick={() => setVeg((p: number) => p + 1)}>
						+
					</Button>
					<Button
						size="sm"
						onClick={() => setVeg((p: number) => Math.max(0, p - 1))}
					>
						-
					</Button>
				</div>
			</div>

			{/* NONVEG */}
			<div className="flex justify-between items-center">
				<span>NonVeg: {nonveg}</span>
				<div className="flex gap-2">
					<Button size="sm" onClick={() => setNonveg((p: number) => p + 1)}>
						+
					</Button>
					<Button
						size="sm"
						onClick={() => setNonveg((p: number) => Math.max(0, p - 1))}
					>
						-
					</Button>
				</div>
			</div>

			<Button size="sm" onClick={handleSubmit} disabled={loading}>
				{loading ? "Saving..." : "Save Guest Meal"}
			</Button>
		</div>
	);
};

export default GuestMealControl;
