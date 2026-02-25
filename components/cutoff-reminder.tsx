import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CutoffReminderCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Cutoff</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Lunch OFF closes in</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">1h 12m</span>
          <Badge variant="destructive">Hurry</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default CutoffReminderCard;
