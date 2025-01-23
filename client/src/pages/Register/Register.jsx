import { Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const handleRegister = async (formData) => {
    try {
      const response = await axios.post("/api/register", formData);
      if (response.status === 200) {
        toast.success("Registration successful!");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">BlogApp</h1>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
        <RegisterForm onSubmit={handleRegister} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
