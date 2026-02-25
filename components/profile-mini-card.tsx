import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Bed, BookMarked, Hotel, Type, User } from "lucide-react";

interface Profile {
  name: string;
  department: string;
  room: number;
  hostel: string;
  hostelType: string;
  mealStatus: string;
  phone: number;
}

const ProfileMiniCard = () => {
  const profile: Profile = {
    name: "Mahesh Chandra Nayak",
    department: "MCA",
    room: 214,
    hostel: "A",
    hostelType: "Boys",
    mealStatus: "ON",
    phone: 1234567890,
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent>
        <div className="grid h-full gap-4">
          <div className="flex gap-4 items-center justify-center">
            <div className="relative h-32 aspect-square overflow-hidden rounded-full">
              <Image fill src={"/profile.svg"} alt="Profile" />
            </div>
          </div>
          <CardTitle className="font-bold text-center flex justify-center items-center ">
            <div className="text-center text-sm md:text-base flex items-center bg-foreground rounded-full px-4 text-background leading-relaxed">
              {profile.name}
            </div>
          </CardTitle>

          <CardTitle className="font-bold text-center flex justify-center items-center ">
            <div className="text-center text-sm md:text-base flex items-center bg-foreground rounded-full px-4 text-background leading-relaxed">
              <BookMarked className="w-5 h-4" /> {profile.department}
            </div>
          </CardTitle>
          <div className="">
            <CardDescription>
              <div className="flex mt-4 justify-center items-center gap-4">
                <div className="flex gap-2 justify-center items-center text-lg">
                  <Hotel className="w-5 h-5" /> <span>{profile.hostel}</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Bed /> {profile.room}
                </div>
                <div className="flex justify-center items-center gap-2">
                  <User /> {profile.hostelType}
                </div>
              </div>

              <p className="text-center mt-2">+91 {profile.phone}</p>
            </CardDescription>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href="/student/profile" className="w-full flex justify-center">
          <Button variant={"info"}>Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfileMiniCard;
