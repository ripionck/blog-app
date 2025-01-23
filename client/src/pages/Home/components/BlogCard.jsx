import { ThumbsUp, MessageSquare, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const BlogCard = ({
  tags,
  timestamp,
  title,
  description,
  likes,
  comments,
  onClick,
}) => {
  const formattedTags = tags[0].split(",").map((tag) => `#${tag.trim()}`);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-blue-600 dark:text-blue-400 text-sm">
          {formattedTags.join(" ")}
        </span>
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {formatDate(timestamp)}
        </span>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <ThumbsUp className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">
              {likes.length}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">
              {comments.length}
            </span>
          </div>
        </div>
        <a
          href="#"
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 
                              flex items-center space-x-1 text-sm font-medium"
          onClick={onClick}
        >
          <span>Read More</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  timestamp: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BlogCard;
