const ActivationSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <h1 className="text-3xl font-bold text-green-400">Account Activated!</h1>
      <p className="mt-4 text-gray-700">
        Your account has been successfully activated. You can now log in and
        start using the platform.
      </p>
      <a
        href="/login"
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
      >
        Go to Login
      </a>
    </div>
  );
};

export default ActivationSuccess;
