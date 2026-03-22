import { Separator } from "@/components/ui/separator";
import { LoginForm } from "./login-form";
import Link from "next/link";
import { User } from "lucide-react";

const LoginPage = () => {
	return (
		<section className="w-full flex items-center min-h-screen justify-center">
			<div className="min-w-full sm:min-w-md max-w-7xl mt-10 grid gap-4 px-4">
				{
					//<h1 className="text-center text-3xl"> FMU Mess Portal </h1>
				}
				<LoginForm />
				<Separator />
				<div className="flex justify-center gap-2">
					<h3 className="flex gap-2 items-center">
						<User size={20} />
						New User?
					</h3>
					<Link href={"/signup"} className="flex underline">
						Sign Up
					</Link>
					<p>Now!</p>
				</div>
			</div>
		</section>
	);
};

export default LoginPage;
