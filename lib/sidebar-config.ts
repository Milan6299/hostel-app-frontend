import {
  Home,
  Utensils,
  CalendarDays,
  Receipt,
  MessageSquare,
  Bell,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Package,
} from "lucide-react";

export const sidebarConfig = {
  student: [
    { title: "Dashboard", url: "/student", icon: Home },
    { title: "Menu", url: "/student/menu", icon: Utensils },
    { title: "Leave", url: "/student/leave", icon: CalendarDays },
    { title: "Billing", url: "/student/billing", icon: Receipt },
    { title: "Feedback", url: "/student/feedback", icon: MessageSquare },
    { title: "Notices", url: "/student/notices", icon: Bell },
  ],

  cook: [
    { title: "Dashboard", url: "/cook", icon: Home },
    { title: "Meal Count", url: "/cook/meals", icon: ClipboardList },
    { title: "Inventory", url: "/cook/inventory", icon: Package },
    { title: "Menu Schedule", url: "/cook/menu", icon: Utensils },
  ],

  admin: [
    { title: "Dashboard", url: "/admin", icon: Home },
    { title: "Students", url: "/admin/students", icon: Users },
    { title: "Billing", url: "/admin/billing", icon: Receipt },
    { title: "Reports", url: "/admin/reports", icon: BarChart3 },
    { title: "Menu Control", url: "/admin/menu", icon: Utensils },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ],
};
