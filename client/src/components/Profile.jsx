import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Profile = ({ isLoggedIn }) => (
  <div className="relative">
    {isLoggedIn ? (
      <Link to="/profile">
        <button
          className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-transparent
                       hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="text-gray-900 dark:text-white font-bold">
            <User className="h-5 w-5" />
          </span>
        </button>
      </Link>
    ) : (
      <Link to="/login">
        <button
          className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-transparent
                       hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Login
          </span>
        </button>
      </Link>
    )}
  </div>
);

Profile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default Profile;
