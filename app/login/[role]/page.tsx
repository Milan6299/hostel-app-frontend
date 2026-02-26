const SignUpPage = async ({
  params,
}: {
  params: Promise<{ role: string }>;
}) => {
  const { role } = await params;
  console.log(role);

  return <div>{role}</div>;
};

export default SignUpPage;
