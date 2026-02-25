import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const days = [
  { day: "Mon", meal: "Paneer Masala", special: true },
  { day: "Tue", meal: "Chicken Curry" },
  { day: "Wed", meal: "Dal Fry" },
  { day: "Thu", meal: "Veg Biryani" },
  { day: "Fri", meal: "Fish Curry" },
  { day: "Sat", meal: "Egg Curry" },
  { day: "Sun", meal: "Chicken Curry" },
];

const WeeklyMenuCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Menu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {days.map((d) => (
          <div key={d.day} className="flex justify-between text-sm">
            <span>{d.day}</span>
            <span className="flex items-center gap-2">
              {d.meal}
              {d.special && <Badge>Special</Badge>}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WeeklyMenuCard;
