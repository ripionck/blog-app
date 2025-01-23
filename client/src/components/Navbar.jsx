import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import Profile from "./Profile";
import PropTypes from "prop-types";

const Navbar = ({ searchQuery, onSearchQuery, isLoggedIn }) => (
  <div className="w-full bg-white dark:bg-gray-800 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between h-16">
        <Logo />
        <SearchBar searchQuery={searchQuery} onSearchQuery={onSearchQuery} />
        <div className="flex items-center space-x-4">
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
