"use client";

import { create } from "zustand";
import { api } from "../helpers";
import { toast } from "sonner";
import { noticesURL } from "../api/notice";

interface Notice {
	id: number;
	title: string;
	content: string;
	priority: "high" | "low";
	created_at: string;
	is_seen: boolean;
}

interface NoticeState {
	notices: Notice[];
	unreadCount: number;
	isLoading: boolean;
	fetchNotices: () => Promise<void>;
	fetchUnreadCount: () => Promise<void>;
	markAsRead: (id: number) => Promise<void>;
	markAllAsRead: () => Promise<void>;
}

export const useNoticeStore = create<NoticeState>((set, get) => ({
	notices: [],
	unreadCount: 0,
	isLoading: false,

	fetchNotices: async () => {
		set({ isLoading: true });
		try {
			const response = await api.get("/api/notices/");
			const notices = response.data;
			const unread = notices.filter((n: Notice) => !n.is_seen).length;
			set({ notices: notices, unreadCount: unread, isLoading: false });
		} catch (error) {
			set({ isLoading: false });
		}
	},
	fetchUnreadCount: async () => {
		try {
			const response = await api.get(`${noticesURL}/unread-count/`);
			set({ unreadCount: response.data });
		} catch (err) {
			console.error(err);
		}
	},

	markAsRead: async (id: number) => {
		try {
			await api.post(`/api/notices/${id}/mark-seen/`);
			const updatedNotices = get().notices.map((n) =>
				n.id === id ? { ...n, is_seen: true } : n,
			);
			set({
				notices: updatedNotices,
				unreadCount: Math.max(0, get().unreadCount - 1),
			});
		} catch (error) {
			console.error("Failed to mark notice as seen");
			toast("Failed to mark current notice as seen");
		}
	},

	markAllAsRead: async () => {
		try {
			await api.post("/api/notices/mark-all-seen/");

			const updatedNotices = get().notices.map((n) => ({
				...n,
				is_seen: true,
			}));

			set({
				notices: updatedNotices,
				unreadCount: 0,
			});
		} catch (error) {
			console.error("Failed to mark all notices as seen");
			toast("Failed to mark all notices as seen");
		}
	},
}));
