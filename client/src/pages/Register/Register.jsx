import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/register/RegisterForm";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/signup",
        formData,
      );
      if (response.status === 201) {
        toast.success(
          "Registration successful! Check your email to activate your account.",
        );
        navigate("/check-email", { state: { email: formData.email } });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Registration failed. Please try again.",
      );
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">BlogApp</h1>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?
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
