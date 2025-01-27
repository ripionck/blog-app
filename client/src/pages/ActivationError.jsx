import { useLocation } from "react-router-dom";

const ActivationError = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const message = params.get("message");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-700">Activation Failed</h1>
      <p className="mt-4 text-gray-700">
        {message || "An unknown error occurred while activating your account."}
      </p>
      <a
        href="/support"
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
      >
        Contact Support
      </a>
    </div>
  );
};

export default ActivationError;
