import WhoIsThis from "./who-is-this";

const Login = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="w-full flex flex-col gap-10 items-center mt-20 justify-center">
        <h2 className="text-3xl">FMU Mess Management</h2>
        <WhoIsThis />
      </div>
    </section>
  );
};

export default Login;
