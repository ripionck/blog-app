const SocialLogin = () => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        type="button"
        className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg p-2 w-10 h-10 hover:bg-gray-200"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google"
          className="w-6 h-6"
        />
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg p-2 w-10 h-10 hover:bg-gray-200"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
          alt="Facebook"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
};

export default SocialLogin;
