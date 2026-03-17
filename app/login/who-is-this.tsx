"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, ShieldUser, User } from "lucide-react";
import Link from "next/link";

interface WhoIsUser {
	role: string;
	icon: React.ReactNode;
	path: string;
}

const WhoIsThis = () => {
	const users: WhoIsUser[] = [
		{
			role: "Student",
			icon: <User />,
			path: "/signup/student",
		},
		{
			role: "Cook",
			icon: <ChefHat />,
			path: "/signup/cook",
		},
		{
			role: "Admin",
			icon: <ShieldUser />,
			path: "/signup/admin",
		},
	];

	return (
		<div>
			<div className="grid p-4 w-screen max-w-7xl grid-cols-3 gap-8 ">
				{users.map((user) => {
					return (
						<Link key={user.role} href={user.path}>
							<Card key={user.role} className="row-span-5">
								<CardHeader>
									<CardTitle className="font-bold text-xl">
										{user.role}
									</CardTitle>
								</CardHeader>
								<CardContent>{user.icon}</CardContent>
							</Card>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default WhoIsThis;
