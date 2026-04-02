import ExpenseCard from "@/components/expense-card";
import NoticesCard from "@/components/notice-card";
import NutritionInfoCard from "@/components/nutrition-info-card";
import ProfileMiniCard from "@/components/profile-mini-card";
import TodayMealCard from "@/components/today-meal-card";
import WeeklyMenuCard from "@/components/weekly-menu-card";

const StudentHome = () => {
	const date = new Date();

	return (
		<div className="">
			<h1 className="mb-4">
				Good {date.getHours() > 17 ? "Evening" : "Morning"}, User
			</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div className="grid gap-4 md:grid-cols-1">
					<TodayMealCard />
					<WeeklyMenuCard />
				</div>
				<div className="grid gap-4">
					<NoticesCard />
					<ExpenseCard />
				</div>
				<div className="grid gap-4">
					<NutritionInfoCard />
					<ProfileMiniCard />
				</div>
			</div>
		</div>
	);
};

export default StudentHome;
