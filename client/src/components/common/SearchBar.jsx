import { Search } from "lucide-react";
import PropTypes from "prop-types";

export default function SearchBar({ searchQuery, onSearchQuery }) {
  return (
    <div className="max-w-2xl mx-auto px-6 my-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          className="w-full py-3 px-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onSearchQuery(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQuery: PropTypes.func.isRequired,
};
