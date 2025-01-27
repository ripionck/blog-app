import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!email) {
      setMessage("Email is missing. Please try registering again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `http://localhost:3001/api/users/resend-activation`,
        { email },
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "An error occurred while resending the activation email.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="max-w-lg p-6 bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800">Check Your Email</h1>
        <p className="text-gray-600 mt-2">
          We&apos;ve sent an activation link to{" "}
          <strong>{email || "your email"}</strong>. Please check your inbox to
          activate your account.
        </p>
        <p className="text-gray-600 mt-2">
          Didn&apos;t receive the email? Check your spam folder or click the
          button below to resend.
        </p>
        <button
          onClick={handleResend}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          {loading ? "Resending..." : "Resend Email"}
        </button>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
        <button
          onClick={() => navigate("/")}
          className="mt-2 ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default CheckEmail;
