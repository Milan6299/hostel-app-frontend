import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import MobileDock from "../../components/MobileDock";
import ProfileDropdown from "../../components/ProfileDropDown";
import LogoBtn from "../../components/LogoBtn";
import { NoticeProvider } from "../providers";

export default function Layout({ children }: { children: React.ReactNode }) {
	const role = "student";
	return (
		<NoticeProvider>
			<div className="min-h-screen">
				<div className="sm:hidden">
					<main className="flex-1 px-4 py-24">
						<div className="flex fixed w-screen h-20 z-50 top-0 left-0 p-4 bg-background items-center mb-4 gap-2 border-b">
							<LogoBtn />
							<div className="ml-auto">
								<ProfileDropdown role={role} />
							</div>
						</div>
						{children}
						<MobileDock role={role} />
					</main>
				</div>

				{/* Desktop View */}
				<div className="hidden sm:block">
					<SidebarProvider>
						<AppSidebar role={role} />
						<main className="flex-1 px-4 pb-4">
							<div className="flex sticky z-50 top-0 py-4 bg-background items-center mb-4 gap-2">
								<SidebarTrigger />
								<LogoBtn />
								<div className="ml-auto">
									<ProfileDropdown role={role} />
								</div>
							</div>
							{children}
						</main>
					</SidebarProvider>
				</div>
			</div>
		</NoticeProvider>
	);
}
