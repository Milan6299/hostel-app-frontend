export default async function SignUpPage({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;
	return (
		<div>
			{/*for development
			<h1>Sign Up Form for {role}</h1>
      */}
			{children}
		</div>
	);
}
