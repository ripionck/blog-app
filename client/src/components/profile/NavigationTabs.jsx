import PropTypes from "prop-types";

const NavigationTabs = ({ activeTab, onTabChange }) => (
  <div className="border-b mt-8">
    <nav className="flex gap-8">
      <button
        className={`text-sm pb-4 px-1 ${
          activeTab === "posts"
            ? "text-blue-500 border-b-2 border-blue-500"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onTabChange("posts")}
      >
        My Posts
      </button>
      <button
        className={`text-sm pb-4 px-1 ${
          activeTab === "drafts"
            ? "text-blue-500 border-b-2 border-blue-500"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onTabChange("drafts")}
      >
        Drafts
      </button>
      <button
        className={`text-sm pb-4 px-1 ${
          activeTab === "liked"
            ? "text-blue-500 border-b-2 border-blue-500"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onTabChange("liked")}
      >
        Liked Posts
      </button>
      <button
        className={`text-sm pb-4 px-1 ${
          activeTab === "comments"
            ? "text-blue-500 border-b-2 border-blue-500"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onTabChange("comments")}
      >
        Comments
      </button>
    </nav>
  </div>
);

NavigationTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default NavigationTabs;
