import SignUpForm from "../signup-form";

export default async function Page({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;
	return (
		<div className="flex w-screen h-screen items-center justify-center">
			<SignUpForm role={role} />
		</div>
	);
}
