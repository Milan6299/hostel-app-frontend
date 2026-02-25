import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

const notices = [
  "Dinner delayed by 30 minutes",
  "Special sweets on Friday",
  "Kitchen maintenance on Sunday",
];

const NoticesCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notices</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {notices.map((note, i) => (
          <div key={i} className="flex justify-between text-sm gap-2">
            <span>{note}</span>
            <Badge variant="secondary">New</Badge>
          </div>
        ))}
      </CardContent>
      <CardFooter className="mt-auto">
        <Link href={"/student/notices"} className="ml-auto">
          <Button variant={"info"}>View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NoticesCard;
