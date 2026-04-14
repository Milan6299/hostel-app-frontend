"use client";
import { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { EditItemDialog } from "./EditItemDialog";
import { api } from "@/lib/helpers";
import { menuUrl } from "@/lib/api/menu";
import { CreateItemButton } from "./CreateItemButton";
import Link from "next/link";

export type Item = {
	id: number;
	name: string;
};

export function ItemControl({ limit }: { limit?: number }) {
	const [items, setItems] = useState<Item[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const url = limit ? `${menuUrl}/items/?limit=${limit}` : `${menuUrl}/items/`;

	const fetchItems = async () => {
		try {
			setIsLoading(true);
			const response = await api.get(url);
			setItems(response.data);
		} catch (error) {
			console.error("Failed to fetch items:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchItems();
	}, []);

	const handleEditClick = (item: Item) => {
		setSelectedItem(item);
		setIsDialogOpen(true);
	};

	if (isLoading)
		return <div className="text-muted-foreground">Loading items...</div>;

	return (
		<div className="p-6 border rounded-lg grid gap-4 bg-background text-foreground">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Inventory</h2>
				<CreateItemButton onSuccess={fetchItems} />
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Sl.No</TableHead>
						<TableHead className="flex-1">Name</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item: Item, ind) => (
						<TableRow key={item.id}>
							<TableCell className="font-medium">{ind + 1}</TableCell>
							<TableCell className="flex-1">{item.name}</TableCell>
							<TableCell className="text-right">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleEditClick(item)}
								>
									<Edit className="w-4 h-4 mr-2" />
									Edit
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{limit && (
				<Link href={"/cook/inventory"} className="ml-auto">
					<Button variant={"info"} className="w-full sm:w-auto">
						View All
					</Button>
				</Link>
			)}

			<EditItemDialog
				item={selectedItem}
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				onSuccess={fetchItems}
			/>
		</div>
	);
}
