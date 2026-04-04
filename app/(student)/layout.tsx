"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Link from "next/link";
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

export default function Layout({ children }: { children: React.ReactNode }) {
	const role = "student";
	return (
		<SidebarProvider>
			<AppSidebar role={role} />

			<main className="flex-1 px-4 pb-4">
				<div className="flex sticky z-50 top-0 py-4 bg-background items-center mb-4 gap-2">
					<div className="flex items-center">
						<SidebarTrigger />
						<Link href={"/"}>FMU Mess</Link>
					</div>
					<div className="ml-auto">
						<ProfileDropdown role={role} />
					</div>
				</div>
				{children}
			</main>
		</SidebarProvider>
	);
}

function ProfileDropdown({ role }: { role: string }) {
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
				<Button variant="outline">
					<UserCircle />
				</Button>
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
