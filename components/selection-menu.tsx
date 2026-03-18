"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type SelectionMenuProps = {
	placeholder: string;
	items: {
		value: string;
		label: string;
	}[];
	value?: string;
	onChange?: (value: string) => void;
};

export default function SelectionMenu({
	placeholder,
	items,
	value,
	onChange,
}: SelectionMenuProps) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>

			<SelectContent>
				<SelectGroup>
					{items.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
