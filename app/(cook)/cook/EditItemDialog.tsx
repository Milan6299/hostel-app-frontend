"use client";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/lib/helpers";
import { menuUrl } from "@/lib/api/menu";

const itemSchema = z.object({
	name: z.string().trim().min(1, { message: "Item name cannot be empty." }),
});

type ItemFormValues = z.infer<typeof itemSchema>;

interface EditItemProps {
	item: { id: number; name: string } | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess: () => void;
}

export function EditItemDialog({
	item,
	open,
	onOpenChange,
	onSuccess,
}: EditItemProps) {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<ItemFormValues>({
		resolver: zodResolver(itemSchema),
		defaultValues: { name: "" },
	});

	useEffect(() => {
		if (item) {
			setValue("name", item.name);
		}
	}, [item, setValue]);

	const onSubmit = async (data: ItemFormValues) => {
		if (!item) return;

		try {
			await api.patch(`${menuUrl}/items/${item.id}/`, data);

			toast.success("Item updated successfully!");
			onSuccess();
			onOpenChange(false);
		} catch (error) {
			const err = error as AxiosError<any>;

			if (err.response?.data) {
				const errorMessage =
					err.response.data.name?.[0] ||
					err.response.data.error ||
					"Update failed";
				toast.error(errorMessage);
			} else {
				toast.error("Network error. Is the server running?");
			}
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
			<DialogContent className="bg-background text-foreground">
				<DialogHeader>
					<DialogTitle>Edit Item Details</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Item Name</Label>
						<Input
							id="name"
							{...register("name")}
							placeholder="Enter item name..."
							disabled={isSubmitting}
							// Changed from red-500 to destructive
							className={
								errors.name
									? "border-destructive focus-visible:ring-destructive"
									: ""
							}
						/>
						{errors.name && (
							// Changed from text-red-500 to text-destructive
							<p className="text-sm text-destructive font-medium">
								{errors.name.message}
							</p>
						)}
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="ghost"
							onClick={() => onOpenChange(false)}
							disabled={isSubmitting}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Save Changes"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
