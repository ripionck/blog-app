import Logo from "./Logo";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LogIn, Moon, Plus, User } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ searchQuery, onSearchQuery }) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="flex-grow mx-4">
            <SearchBar
              searchQuery={searchQuery}
              onSearchQuery={onSearchQuery}
            />
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <Link to="/create-blog">
                <button className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Plus />
                  Create Blog
                </button>
              </Link>
            )}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Moon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQuery: PropTypes.func.isRequired,
};

export default Navbar;
