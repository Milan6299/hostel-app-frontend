import { BugReportForm } from "./form-schema";

const Login = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="w-full flex flex-col items-center mt-20 justify-center">
        <div>Login Page</div>
        <BugReportForm />
      </div>
    </section>
  );
};

export default Login;
