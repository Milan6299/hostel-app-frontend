import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NutritionInfoCard = () => {
  // const date = new Date();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Calories</span>
          <span>620 kcal</span>
        </div>
        <div className="flex justify-between">
          <span>Protein</span>
          <span>22g</span>
        </div>
        <div className="flex justify-between">
          <span>Carbs</span>
          <span>78g</span>
        </div>
        <div className="flex justify-between">
          <span>Fat</span>
          <span>18g</span>
        </div>

        <Badge className="mt-2">High Protein Lunch</Badge>
      </CardContent>
    </Card>
  );
};

export default NutritionInfoCard;
