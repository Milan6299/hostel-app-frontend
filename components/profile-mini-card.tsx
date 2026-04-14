"use client";
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
import { Bed, BookMarked, Hotel, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/auth/auth";
import { toast } from "sonner";
import SkeletonCard from "./skeleton-card";

interface Profile {
	first_name: string;
	last_name: string;
	department: string;
	room_no: number;
	hostel_type: string;
	hostel_block: string;
	phone: number;
}

const ProfileMiniCard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [proData, setProData] = useState<Profile | null>(null);

	const getData = async () => {
		setIsLoading(true);
		await getProfile()
			.then((resp) => {
				console.log(resp);
				setProData(resp);
			})
			.catch((err) => {
				const { status } = err || {};
				console.log(status);
				toast.error("Error occured! Try again!");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	useEffect(() => {
		getData();
	}, []);

	if (isLoading || !proData) return <SkeletonCard />;

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
							{proData.first_name} {proData.last_name}
						</div>
					</CardTitle>

					<CardTitle className="font-bold text-center flex justify-center items-center ">
						<div className="text-center text-sm md:text-base flex items-center bg-foreground rounded-full px-4 text-background leading-relaxed">
							<BookMarked className="w-5 h-4" /> {proData.department}
						</div>
					</CardTitle>
					<div className="">
						<CardDescription>
							<div className="flex mt-4 justify-center items-center gap-4">
								<div className="flex gap-2 justify-center items-center text-lg">
									<Hotel className="w-5 h-5" />{" "}
									<span>{proData.hostel_block}</span>
								</div>
								<div className="flex justify-center items-center gap-2">
									<Bed /> {proData.room_no}
								</div>
								<div className="flex justify-center items-center gap-2">
									<User /> {proData.hostel_type === "boys" ? "BOYS" : "GIRLS"}
								</div>
							</div>

							<p className="text-center mt-2">+91 {proData.phone}</p>
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
