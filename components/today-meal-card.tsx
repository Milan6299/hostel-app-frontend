"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Check, X, Plus, Minus, Circle, User } from "lucide-react";

const TodayMealCard = ({ meal }: any) => {
	// 🔥 STATE
	const [isOn, setIsOn] = useState(false);
	const [preference, setPreference] = useState<"veg" | "nonveg">("veg");
	const [guestVeg, setGuestVeg] = useState(0);
	const [guestNonveg, setGuestNonveg] = useState(0);

	// 🔥 INIT FROM BACKEND
	useEffect(() => {
		setIsOn(meal.status === "ON");
		setGuestVeg(meal.guest_veg_count || 0);
		setGuestNonveg(meal.guest_nonveg_count || 0);
	}, [meal]);

	// 🔥 API CALL
	const toggleMeal = async (status: boolean) => {
		try {
			const res = await fetch("/api/toggle-meal", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					meal_id: meal.id,
					status,
					guest_veg_count: guestVeg,
					guest_nonveg_count: guestNonveg,
				}),
			});

			const data = await res.json();

			if (!res.ok) throw new Error(data.error);

			setIsOn(status);
		} catch (err) {
			console.error(err);
		}
	};

	// 🔥 AUTO UPDATE ON GUEST CHANGE
	useEffect(() => {
		if (isOn) {
			toggleMeal(true);
		}
	}, [guestVeg, guestNonveg]);

	// 🔥 PRICE CALC (frontend preview only)
	const totalGuestPrice =
		guestVeg * meal.guest_price + guestNonveg * meal.guest_price;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex justify-between">
					<span>{meal.meal_type}</span>
					<Badge>{meal.is_special ? "Special" : "Normal"}</Badge>
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* MENU ITEMS */}
				<p className="text-sm text-muted-foreground">
					{meal.items.map((i: any) => i.name).join(", ")}
				</p>

				{/* PREFERENCE SWITCH */}
				<div className="flex items-center gap-2">
					<span className="text-sm">Preference:</span>
					<Button
						onClick={() =>
							setPreference(preference === "veg" ? "nonveg" : "veg")
						}
						variant="secondary"
						size="sm"
					>
						<Circle
							className={`${
								preference === "veg" ? "bg-green-500" : "bg-red-500"
							} rounded-full`}
						/>
					</Button>
				</div>

				{/* GUEST CONTROLS */}
				<div className="space-y-2">
					<p className="text-sm font-medium">Guest Meals</p>

					{/* VEG */}
					<div className="flex items-center justify-between">
						<span className="flex items-center gap-2">
							<User /> Veg: {guestVeg}
						</span>
						<div className="flex gap-2">
							<Button size="sm" onClick={() => setGuestVeg((p) => p + 1)}>
								<Plus />
							</Button>
							{guestVeg > 0 && (
								<Button
									size="sm"
									onClick={() => setGuestVeg((p) => Math.max(0, p - 1))}
								>
									<Minus />
								</Button>
							)}
						</div>
					</div>

					{/* NONVEG */}
					<div className="flex items-center justify-between">
						<span className="flex items-center gap-2">
							<User /> NonVeg: {guestNonveg}
						</span>
						<div className="flex gap-2">
							<Button size="sm" onClick={() => setGuestNonveg((p) => p + 1)}>
								<Plus />
							</Button>
							{guestNonveg > 0 && (
								<Button
									size="sm"
									onClick={() => setGuestNonveg((p) => Math.max(0, p - 1))}
								>
									<Minus />
								</Button>
							)}
						</div>
					</div>
				</div>

				{/* PRICE */}
				<div className="text-sm">Guest Total: ₹{totalGuestPrice}</div>
			</CardContent>

			<CardFooter className="flex justify-end gap-2">
				<Button onClick={() => toggleMeal(true)} variant="success">
					<Check />
				</Button>
				<Button onClick={() => toggleMeal(false)} variant="destructive">
					<X />
				</Button>
			</CardFooter>
		</Card>
	);
};

export default TodayMealCard;
