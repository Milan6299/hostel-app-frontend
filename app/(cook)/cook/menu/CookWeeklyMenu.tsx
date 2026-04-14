"use client";

import { useEffect, useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Star,
	Edit,
	Plus,
	Check,
	ChevronsUpDown,
	User,
	Users,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { menuUrl } from "@/lib/api/menu";
import { api } from "@/lib/helpers";

type Item = { id: number; name: string };
type MealItem = { id: number; name: string };
type Meal = {
	id: number;
	meal_type: string;
	food_type: string;
	price: string;
	guest_price: string;
	is_special: boolean;
	items: MealItem[];
};
type DayMenu = {
	day_name: string;
	day_index: number;
	meals: Meal[];
};

const menuSchema = z.object({
	day_of_week: z.string().min(1, "Select a day"),
	meal_type: z.string().min(1, "Select meal type"),
	food_type: z.string().min(1, "Select food type"),
	price: z.coerce.number().min(0),
	guest_price: z.coerce.number().min(0),
	is_special: z.boolean().default(false),
	items: z.array(z.number()).min(1, "Select at least one item"),
});

type MenuFormValues = z.input<typeof menuSchema>;

const API_URL_MENU = `${menuUrl}/weekly-menu/`;
const API_URL_ITEMS = `${menuUrl}/items/`;

export default function CookWeeklyMenu(): ReactElement {
	const [weeklyMenu, setWeeklyMenu] = useState<DayMenu[]>([]);
	const [items, setItems] = useState<Item[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingMeal, setEditingMeal] = useState<{
		meal: Meal;
		day_index: number;
	} | null>(null);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const [menuRes, itemsRes] = await Promise.all([
				api.get(`${API_URL_MENU}list/`),
				api.get(API_URL_ITEMS),
			]);
			setWeeklyMenu(menuRes.data);
			setItems(itemsRes.data);
		} catch (err) {
			toast.error("Failed to load data.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const openCreateDialog = () => {
		setEditingMeal(null);
		setIsDialogOpen(true);
	};

	const openEditDialog = (meal: Meal, day_index: number) => {
		setEditingMeal({ meal, day_index });
		setIsDialogOpen(true);
	};

	if (isLoading)
		return <div className="p-4 text-muted-foreground">Loading menu...</div>;

	return (
		<div className="grid gap-4 bg-background text-foreground">
			<Card>
				<CardHeader className="flex justify-between">
					<CardTitle className="text-xl">Weekly Menu</CardTitle>

					<Button onClick={openCreateDialog}>
						<Plus className="w-4 h-4 mr-2" />
						Add Menu
					</Button>
				</CardHeader>
				<CardContent className="grid gap-4 md:gap-8 w-full">
					{weeklyMenu?.map((day) => (
						<div
							key={day.day_index}
							className="grid gap-4 w-full border-b pb-6 last:border-0"
						>
							<Badge variant="default" className="text-lg w-fit">
								{day.day_name}
							</Badge>
							<div className="grid gap-4 md:gap-8 md:grid-cols-2">
								{day.meals.map((meal) => (
									<Card
										key={meal.id}
										className="p-4 bg-card text-card-foreground shadow-sm"
									>
										<div className="grid gap-4">
											<div className="flex w-full justify-between items-center">
												<div className="flex gap-2 items-center">
													<span className="font-semibold">
														{meal.meal_type.toUpperCase()}
													</span>
													<Badge
														variant={
															meal.food_type === "veg"
																? "success"
																: "destructive"
														}
													>
														{meal.food_type.toUpperCase()}
													</Badge>
												</div>
												<div className="flex gap-4 items-center">
													<div className="text-sm font-medium flex gap-2">
														<div className="text-muted-foreground flex gap-1 mr-1">
															<User size={20} />
															<span>&#8377;{meal.price}</span>
														</div>
														<div className="text-muted-foreground flex gap-1 mr-1">
															<Users size={20} />
															<span>&#8377;{meal.guest_price}</span>
														</div>
													</div>
													<Button
														variant="ghost"
														size="icon"
														onClick={() => openEditDialog(meal, day.day_index)}
													>
														<Edit className="w-4 h-4" />
													</Button>
												</div>
											</div>
											<div className="flex justify-between items-center gap-4">
												<div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
													{meal.items.map((i) => (
														<span
															key={i.id}
															className="bg-secondary px-2 py-1 rounded-md"
														>
															{i.name}
														</span>
													))}
												</div>
												{meal.is_special && (
													<Badge className="bg-info h-fit text-foreground">
														<Star />
														Special
													</Badge>
												)}
											</div>
										</div>
									</Card>
								))}
							</div>
						</div>
					))}
				</CardContent>
			</Card>

			<MenuFormDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				onSuccess={fetchData}
				items={items}
				initialData={editingMeal}
			/>
		</div>
	);
}

interface MenuFormDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess: () => void;
	items: Item[];
	initialData: { meal: Meal; day_index: number } | null;
}

function MenuFormDialog({
	open,
	onOpenChange,
	onSuccess,
	items,
	initialData,
}: MenuFormDialogProps) {
	const isEditing = !!initialData;

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<MenuFormValues>({
		resolver: zodResolver(menuSchema),
		defaultValues: {
			day_of_week: "",
			meal_type: "",
			food_type: "",
			price: 0,
			guest_price: 0,
			is_special: false,
			items: [],
		},
	});

	// Watch selected items to display them in the UI
	const selectedItems = watch("items") || [];

	useEffect(() => {
		if (initialData) {
			setValue("day_of_week", initialData.day_index.toString());
			setValue("meal_type", initialData.meal.meal_type);
			setValue("food_type", initialData.meal.food_type);
			setValue("price", Number(initialData.meal.price));
			setValue("guest_price", Number(initialData.meal.guest_price));
			setValue("is_special", initialData.meal.is_special);
			setValue(
				"items",
				initialData.meal.items.map((i) => i.id),
			);
		} else {
			reset();
		}
	}, [initialData, setValue, reset, open]);

	const onSubmit = async (data: MenuFormValues) => {
		try {
			const payload = {
				...data,
				day_of_week: Number(data.day_of_week),
			};

			console.log("Submitting:", payload);

			if (isEditing) {
				await api.patch(`${API_URL_MENU}${initialData.meal.id}/`, payload);
				toast.success("Meal updated successfully!");
			} else {
				await api.post(API_URL_MENU, payload);
				toast.success("Meal created successfully!");
			}

			onSuccess();
			onOpenChange(false);
		} catch (err) {
			console.log("ERROR RESPONSE:", err.response?.data);

			toast.error(
				JSON.stringify(err.response?.data) || "An error occurred while saving.",
			);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				onOpenChange(isOpen);
				if (!isOpen) reset();
			}}
		>
			<DialogContent className="w-full sm:max-w-2xl bg-background text-foreground max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>
						{isEditing ? "Edit Meal" : "Create New Meal"}
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
					<div className="grid grid-cols-2 gap-4">
						{/* Day of Week */}
						<div className="space-y-2">
							<Label>Day of the Week</Label>
							<Select
								value={watch("day_of_week")}
								onValueChange={(val) => setValue("day_of_week", val)}
							>
								<SelectTrigger
									className={errors.day_of_week ? "border-destructive" : ""}
								>
									<SelectValue placeholder="Select day" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="0">Monday</SelectItem>
									<SelectItem value="1">Tuesday</SelectItem>
									<SelectItem value="2">Wednesday</SelectItem>
									<SelectItem value="3">Thursday</SelectItem>
									<SelectItem value="4">Friday</SelectItem>
									<SelectItem value="5">Saturday</SelectItem>
									<SelectItem value="6">Sunday</SelectItem>
								</SelectContent>
							</Select>
							{errors.day_of_week && (
								<p className="text-xs text-destructive">
									{errors.day_of_week.message}
								</p>
							)}
						</div>

						{/* Meal Type */}
						<div className="space-y-2">
							<Label>Meal Type</Label>
							<Select
								value={watch("meal_type")}
								onValueChange={(val) => setValue("meal_type", val)}
							>
								<SelectTrigger
									className={errors.meal_type ? "border-destructive" : ""}
								>
									<SelectValue placeholder="Select meal" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="lunch">Lunch</SelectItem>
									<SelectItem value="dinner">Dinner</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Food Type */}
						<div className="space-y-2">
							<Label>Food Type</Label>
							<Select
								value={watch("food_type")}
								onValueChange={(val) => setValue("food_type", val)}
							>
								<SelectTrigger
									className={errors.food_type ? "border-destructive" : ""}
								>
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="veg">Vegetarian</SelectItem>
									<SelectItem value="nonveg">Non-Vegetarian</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Price */}
						<div className="space-y-2">
							<Label>Student Price (&#8377;)</Label>
							<Input type="number" step="0.01" {...register("price")} />
						</div>

						{/* Guest Price */}
						<div className="space-y-2">
							<Label>Guest Price (&#8377;)</Label>
							<Input type="number" step="0.01" {...register("guest_price")} />
						</div>

						{/* Is Special */}
						<div className="space-y-2 flex flex-col justify-center mt-6">
							<div className="flex items-center space-x-2">
								<Switch
									checked={watch("is_special")}
									onCheckedChange={(val) => setValue("is_special", val)}
								/>
								<Label>Mark as Special Meal</Label>
							</div>
						</div>
					</div>

					{/* Multi-Select Items (Popover + Command) */}
					<div className="space-y-2 pt-2">
						<Label>Menu Items</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									className={cn(
										"w-full justify-between",
										errors.items ? "border-destructive" : "",
									)}
								>
									{selectedItems.length > 0
										? `${selectedItems.length} items selected`
										: "Select items..."}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-[400px] p-0" align="start">
								<Command>
									<CommandInput placeholder="Search items..." />
									<CommandList>
										<CommandEmpty>No item found.</CommandEmpty>
										<CommandGroup>
											<ScrollArea className="h-48">
												{items.map((item) => {
													const isSelected = selectedItems.includes(item.id);
													return (
														<CommandItem
															key={item.id}
															onSelect={() => {
																if (isSelected) {
																	setValue(
																		"items",
																		selectedItems.filter(
																			(id) => id !== item.id,
																		),
																	);
																} else {
																	setValue("items", [
																		...selectedItems,
																		item.id,
																	]);
																}
															}}
														>
															<div
																className={cn(
																	"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
																	isSelected
																		? "bg-primary text-primary-foreground"
																		: "opacity-50 [&_svg]:invisible",
																)}
															>
																<Check className="h-4 w-4" />
															</div>
															{item.name}
														</CommandItem>
													);
												})}
											</ScrollArea>
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
						{errors.items && (
							<p className="text-xs text-destructive">{errors.items.message}</p>
						)}

						{/* Display Selected Badges */}
						<div className="flex flex-wrap gap-2 mt-2">
							{items
								.filter((item) => selectedItems.includes(item.id))
								.map((item) => (
									<Badge key={item.id} variant="secondary">
										{item.name}
									</Badge>
								))}
						</div>
					</div>

					<div className="flex justify-end gap-2 pt-4">
						<Button
							type="button"
							variant="ghost"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting
								? "Saving..."
								: isEditing
									? "Save Changes"
									: "Create Meal"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
