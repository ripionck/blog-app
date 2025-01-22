import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-8">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search posts, tags, or authors..."
          className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
      </div>
      <div className="ml-4">
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Categories</option>
          <option>Web Development</option>
          <option>Programming</option>
          <option>Design</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
