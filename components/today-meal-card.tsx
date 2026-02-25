import { Check, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const TodayMealCard = () => {
  const currentMeal = {
    type: "Lunch",
    item: "Rice, Dal, Chicken, Salad",
    special: true,
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {"Today's"} {currentMeal.type}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex gap-2">
        <CardDescription>
          <Badge variant={"default"}>
            {currentMeal.special ? "Special" : "Normal"}
          </Badge>

          <p className="mt-2">{currentMeal.item}</p>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant={"success"}>
          <Check />
        </Button>
        <Button variant={"destructive"}>
          <X />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TodayMealCard;
