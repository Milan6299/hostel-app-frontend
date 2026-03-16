import SignUpForm from "../signup-form";

const SignUpPage = async ({
	params,
}: {
	params: Promise<{ role: string }>;
}) => {
	const { role } = await params;
	console.log(role);

	return (
		<div>
			<p> {role}</p>
			<div>
				<SignUpForm role={role} />
			</div>
		</div>
	);
};

export default SignUpPage;
