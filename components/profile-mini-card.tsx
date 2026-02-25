import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

interface Profile {
  name: string;
  room: number;
  hostel: string;
  hostelType: string;
  mealStatus: string;
  phone: number;
}

const ProfileMiniCard = () => {
  const profile: Profile = {
    name: "Mahesh",
    room: 214,
    hostel: "A",
    hostelType: "Boys",
    mealStatus: "ON",
    phone: 1234567890,
  };

  return (
    <Card>
      <CardContent>
        <div className="grid h-full grid-cols-3 gap-4">
          <div className="flex col-span-1 flex-col gap-4 justify-between">
            <div className="relative aspect-square overflow-hidden rounded-full">
              <Image fill src={"/profile.svg"} alt="Profile" />
            </div>
            <Button>View</Button>
          </div>
          <div className="col-span-2">
            <CardDescription>
              <CardTitle className="font-bold text-foreground leading-relaxed">
                {profile.name}'s Profile
              </CardTitle>
              <div className="flex mt-4 flex-col gap-2">
                <p>Hostel: {profile.hostel}</p>
                <p>Room: {profile.room}</p>
                <p>Type: {profile.hostelType}</p>
                <p>Mob: +91 {profile.phone}</p>
              </div>
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileMiniCard;
