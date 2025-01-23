import { Link } from "react-router-dom";

const Logo = () => (
  <div className="flex-shrink-0">
    <Link to="/" className="flex items-center">
      <svg
        className="h-8 w-8 text-blue-500"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
        BlogApp
      </span>
    </Link>
  </div>
);

export default Logo;
