import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LogIn, User } from "lucide-react";

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
        <button className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <LogIn className="h-4 w-4" />
          Login
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
