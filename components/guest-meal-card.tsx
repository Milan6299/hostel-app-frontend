"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Minus, Plus, User } from "lucide-react";

const GuestMealCard = () => {
  const price = 80;
  const [count, setCount] = useState<number>(0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Meal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm gap-2">
          <span>Price:</span>
          {count !== 0 ? (
            <span>₹{count * price}</span>
          ) : (
            <span className="font-medium">₹80</span>
          )}
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="flex gap-2 md:gap-4">
            <User /> {count}
          </div>
          <div className="flex flex-col items-center md:flex-row">
            <Button
              onClick={() => setCount((prev) => prev + 1)}
              variant={"secondary"}
              size={"responsive"}
            >
              <Plus />
            </Button>
            {count !== 0 && (
              <Button
                onClick={() => setCount((prev) => prev - 1)}
                variant={"secondary"}
                size={"responsive"}
              >
                <Minus />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          disabled={count ? false : true}
          size={"responsive"}
          className="w-full"
        >
          Request
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuestMealCard;
