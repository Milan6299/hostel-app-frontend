"use server";
import FormRenderer from "./FormRenderer";

export default async function CompleteProfile({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	return <FormRenderer role={role} />;
}
