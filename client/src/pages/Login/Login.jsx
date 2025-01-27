import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/login/LoginForm";
import SocialLogin from "../../components/login/SocialLogin";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        formData,
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("authToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">BlogApp</h1>
        <p className="text-center text-gray-600 mb-6">
          New to BlogApp?{" "}
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>
        <LoginForm onSubmit={handleLogin} />
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-600">Or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <SocialLogin />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
