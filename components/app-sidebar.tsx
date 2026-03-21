"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarRail,
} from "@/components/ui/sidebar";

import { sidebarConfig } from "@/lib/sidebar-config";
import { User, LogOut } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { api } from "@/lib/helpers";
import { toast } from "sonner";
type Role = "student" | "cook" | "admin";

export function AppSidebar({ role }: { role: Role }) {
	const pathname = usePathname();
	const menuItems = sidebarConfig[role];
	const router = useRouter();

	function handleLogout() {
		api
			.post("/api/logout/")
			.then((resp) => {
				toast(`${resp.data.message}`);
				router.push("/login");
			})
			.catch(() => router.push("/login"));
	}

	return (
		<Sidebar collapsible="offcanvas">
			{/* HEADER */}
			<SidebarHeader>
				<SidebarContent>
					<div className="flex gap-2 text-lg items-center p-2">
						<h2>Mess Portal</h2>
					</div>
				</SidebarContent>
			</SidebarHeader>

			{/* CONTENT */}
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										tooltip={item.title}
										isActive={pathname === item.url}
									>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* FOOTER */}
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href={`/${role}/profile`}>
								<User />
								<span>Profile</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>

					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Dialog>
								<form>
									<DialogTrigger asChild>
										<Button className="flex cursor-pointer items-center p-0">
											<LogOut /> Logout
										</Button>
									</DialogTrigger>
									<DialogContent
										className="sm:max-w-sm"
										showCloseButton={false}
									>
										<DialogHeader>
											<DialogTitle>Logout?</DialogTitle>
											<DialogDescription className="py-4">
												Are you sure you want to Logout?
											</DialogDescription>
										</DialogHeader>
										<DialogFooter>
											<DialogClose asChild>
												<Button>Cancel</Button>
											</DialogClose>
											<Button
												onClick={handleLogout}
												variant={"destructive"}
												type="submit"
											>
												Logout
											</Button>
										</DialogFooter>
									</DialogContent>
								</form>
							</Dialog>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
