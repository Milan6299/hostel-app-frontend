import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar role="student" />

      <main className="flex-1 p-4">
        <div className="flex items-center mb-4 gap-2">
          <SidebarTrigger />
          <Link href={"#"}>Hostel App</Link>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
