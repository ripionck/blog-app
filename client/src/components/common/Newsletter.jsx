export default function Newsletter() {
  return (
    <div className="max-h-5xl bg-gray-900 flex items-center justify-center px-4 pt-4">
      <div className="max-w-xl w-full p-4">
        <div className="text-center mb-4">
          <p className="text-gray-400 text-sm">
            Get the latest posts and insights delivered straight to your inbox.
            No spam, unsubscribe anytime.
          </p>
        </div>
        <form className="flex gap-2 mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-2 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mb-4">
          By subscribing, you agree to our
          <a href="#" className="text-blue-400 hover:text-blue-300 ml-1">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
