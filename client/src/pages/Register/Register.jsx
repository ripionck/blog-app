import RegisterForm from "./components/RegisterForm";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">BlogApp</h1>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
