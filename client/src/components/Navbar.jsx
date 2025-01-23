import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import Profile from "./Profile";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Navbar = ({ searchQuery, onSearchQuery, isLoggedIn }) => (
  <div className="w-full bg-white dark:bg-gray-800 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between h-16">
        <Logo />
        <SearchBar searchQuery={searchQuery} onSearchQuery={onSearchQuery} />
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <Link to="/create-post">
              <button className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Plus />
                Create Post
              </button>
            </Link>
          )}
          <ThemeToggle />
          <Profile isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  </div>
);

Navbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQuery: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
