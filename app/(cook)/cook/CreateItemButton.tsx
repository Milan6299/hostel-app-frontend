import { useState } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
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

interface CreateItemButtonProps {
	onSuccess: () => void;
}

export function CreateItemButton({ onSuccess }: CreateItemButtonProps) {
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ItemFormValues>({
		resolver: zodResolver(itemSchema),
		defaultValues: { name: "" },
	});

	const onSubmit = async (data: ItemFormValues) => {
		try {
			await api.post(`${menuUrl}/items/`, data);

			toast.success("Item created successfully!");
			onSuccess();
			setOpen(false);
			reset();
		} catch (error) {
			const err = error as AxiosError<any>;

			if (err.response?.data) {
				// Catches "Item with this name already exists" from Django
				const errorMessage =
					err.response.data.name?.[0] ||
					err.response.data.error ||
					"Creation failed";
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
				setOpen(isOpen);
				if (!isOpen) reset(); // Clean up form and errors if user clicks away
			}}
		>
			<DialogTrigger asChild>
				<Button>
					<Plus className="w-4 h-4 mr-2" />
					Create
				</Button>
			</DialogTrigger>

			<DialogContent className="bg-background text-foreground">
				<DialogHeader>
					<DialogTitle>Create New Item</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="create-name">Item Name</Label>
						<Input
							id="create-name"
							{...register("name")}
							placeholder="Enter new item name..."
							disabled={isSubmitting}
							className={
								errors.name
									? "border-destructive focus-visible:ring-destructive"
									: ""
							}
						/>
						{errors.name && (
							<p className="text-sm text-destructive font-medium">
								{errors.name.message}
							</p>
						)}
					</div>

					<DialogFooter className="space-y-4">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setOpen(false)}
							disabled={isSubmitting}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Item"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
