import { Search } from "lucide-react";
import PropTypes from "prop-types";

const SearchBar = ({ searchQuery, onSearchQuery }) => (
  <div className="flex-1 max-w-2xl mx-4">
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="absolute right-3 top-2.5">
        <Search className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  </div>
);

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
