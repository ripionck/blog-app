import PropTypes from "prop-types";

const TagsSection = ({ tags }) => {
  return (
    <div className="mt-8 pt-8 border-t">
      <h3 className="text-lg font-semibold mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

TagsSection.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagsSection;
