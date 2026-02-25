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
import { Minus, Plus } from "lucide-react";

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
            <span className="font-medium">₹80/guest</span>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:items-center transition-transform">
          <p className="">Guest: {count}</p>
          <div className="flex">
            <Button
              onClick={() => setCount((prev) => prev + 1)}
              variant={"secondary"}
            >
              <Plus />
            </Button>
            {count !== 0 && (
              <Button
                onClick={() => setCount((prev) => prev - 1)}
                variant={"secondary"}
              >
                <Minus />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button disabled={count ? false : true} className="w-full ">
          Request Meal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuestMealCard;
