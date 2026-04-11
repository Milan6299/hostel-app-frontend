"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/helpers";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const GuestMealControl = ({
	meal,
	canShowVeg,
	canShowNonVeg,
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

			await api.post("/api/menu/guest-meals/create/", {
				meal: meal.id, // Make sure meal.id is an integer, not undefined!
				veg_count: veg,
				nonveg_count: nonveg,
			});

			onSuccess?.();
			toast(`Saved Successfully!`);
		} catch (err: any) {
			// Updated to print the exact backend error message
			console.error("Failed to save:", err.response?.data || err.message);
			toast(`${err.response.data}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-2">
			<p className="text-sm font-medium">Guest Meals</p>

			{canShowVeg && (
				<div className="flex items-center justify-between gap-3">
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
			)}

			{canShowNonVeg && (
				<div className="flex items-center justify-between gap-3">
					<span>Non-Veg: {nonveg}</span>
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
			)}

			<div className="flex gap-2">
				<Button size="sm" onClick={handleSubmit} disabled={loading}>
					{loading ? "Saving..." : "Save Guest Meal"}
				</Button>
				<Button
					variant={"destructive"}
					size={"icon-sm"}
					onClick={() => {
						setVeg(0);
						setNonveg(0);
					}}
				>
					<Trash2 />
				</Button>
			</div>
		</div>
	);
};

export default GuestMealControl;
