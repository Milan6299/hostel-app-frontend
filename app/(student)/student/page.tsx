import TodayMenuCard from "./menu/today-menu";
import ExpenseCard from "@/components/expense-card";
import NoticesCard from "@/components/notice-card";
import ProfileMiniCard from "@/components/profile-mini-card";
// import TodayMealCard from "@/components/today-meal-card";
import TodayMeals from "@/components/today-meals";

const StudentHome = () => {
	const date = new Date();

	return (
		<div className="">
			<h1 className="mb-4">
				Good {date.getHours() > 17 ? "Evening" : "Morning"}, User
			</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div className="grid gap-4 md:grid-cols-">
					<TodayMeals />
					<TodayMenuCard />
				</div>
				<div className="grid gap-4">
					<NoticesCard />
					<ExpenseCard />
				</div>
				<div className="grid gap-4">
					<ProfileMiniCard />
				</div>
			</div>
		</div>
	);
};

export default StudentHome;
