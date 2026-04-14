import {
	Home,
	Utensils,
	ReceiptIndianRupee,
	MessageSquare,
	Bell,
	Users,
	BarChart3,
	Settings,
} from "lucide-react";

export const sidebarConfig = {
	student: [
		{ title: "Home", url: "/student", icon: Home },
		{ title: "Menu", url: "/student/menu", icon: Utensils },
		{ title: "Notices", url: "/student/notices", icon: Bell },
		{ title: "History", url: "/student/history", icon: ReceiptIndianRupee },
		{ title: "Feedback", url: "/student/feedback", icon: MessageSquare },
	],

	cook: [
		{ title: "Home", url: "/cook", icon: Home },
		{ title: "Menu", url: "/cook/menu", icon: Utensils },
	],

	admin: [
		{ title: "Dashboard", url: "/admin", icon: Home },
		{ title: "Students", url: "/admin/students", icon: Users },
		{ title: "Billing", url: "/admin/billing", icon: ReceiptIndianRupee },
		{ title: "Reports", url: "/admin/reports", icon: BarChart3 },
		{ title: "Menu Control", url: "/admin/menu", icon: Utensils },
		{ title: "Settings", url: "/admin/settings", icon: Settings },
	],
};
