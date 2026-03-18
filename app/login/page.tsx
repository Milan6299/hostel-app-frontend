import { LoginForm } from "./login-form";

const LoginPage = () => {
	return (
		<section className="w-full flex justify-center">
			<div className="min-w-full sm:min-w-md max-w-7xl mt-10 grid gap-4 px-4">
				<h1 className="text-center text-3xl"> Login </h1>
				<LoginForm />
			</div>
		</section>
	);
};

export default LoginPage;
