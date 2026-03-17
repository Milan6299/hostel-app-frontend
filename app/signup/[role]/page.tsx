import SignUpForm from "../signup-form";

export default async function Page({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;
	return <SignUpForm role={role} />;
}
