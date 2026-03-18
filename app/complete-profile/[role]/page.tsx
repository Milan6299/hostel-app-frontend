"use server";
import ProfileForm from "./ProfileForm";

export default async function CompleteProfile({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	return <ProfileForm role={role} />;
}
