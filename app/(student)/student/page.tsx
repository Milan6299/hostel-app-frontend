import ExpenseCard from "@/components/expense-card";
import GuestMealCard from "@/components/guest-meal-card";
import NoticesCard from "@/components/notice-card";
import NutritionInfoCard from "@/components/nutrition-info-card";
import ProfileMiniCard from "@/components/profile-mini-card";
import TodayMealCard from "@/components/today-meal-card";
import WeeklyMenuCard from "@/components/weekly-menu-card";

const StudentHome = () => {
  const date = new Date();
  // console.log(date.getHours);

  return (
    <div className="">
      <h1 className="mb-4">
        Good {date.getHours() > 17 ? "Evening" : "Morning"}, User
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          <TodayMealCard />
          <GuestMealCard />
        </div>
        <div className="lg:col-span-2">
          <ExpenseCard />
        </div>
        <NoticesCard />
        <WeeklyMenuCard />
        <NutritionInfoCard />
        <ProfileMiniCard />
      </div>
    </div>
  );
};

export default StudentHome;
