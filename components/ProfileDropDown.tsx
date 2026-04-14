"use client";
import { LogOut, User, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { logoutUser } from "@/lib/auth/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Role } from "@/lib/types";

export default function ProfileDropdown({ role }: { role: Role }) {
	const router = useRouter();
	const handleLogout = async () => {
		await logoutUser()
			.then((resp) => {
				toast(`${resp.message}`);
				router.push("/login");
			})
			.catch((err) => {
				toast("Logout Successful!");
				router.push("/login");
			});
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<UserCircle />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => router.push(`/${role}/profile`)}>
						<User />
						Profile
					</DropdownMenuItem>
					<Separator />
					<DropdownMenuItem onClick={() => handleLogout()}>
						<LogOut />
						Logout
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
