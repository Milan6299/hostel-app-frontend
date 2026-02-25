import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const notices = [
  "Dinner delayed by 30 minutes",
  "Special sweets on Friday",
  "Kitchen maintenance on Sunday",
];

const NoticesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {notices.map((note, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{note}</span>
            <Badge variant="secondary">New</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NoticesCard;
