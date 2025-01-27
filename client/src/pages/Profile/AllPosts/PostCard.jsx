import { Edit, Trash, ThumbsUp, MessageSquare, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

const PostCard = ({ date, title, description, likes, comments, category }) => (
  <article className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className="text-sm text-gray-500">{date}</span>
        <h2 className="text-xl font-semibold text-gray-900 mt-1">{title}</h2>
      </div>
      <div className="flex gap-2">
        <button className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-gray-100">
          <Edit className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100">
          <Trash className="w-5 h-5" />
        </button>
      </div>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-5 h-5 text-gray-400" />
          <span className="text-gray-500">{likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-5 h-5 text-gray-400" />
          <span className="text-gray-500">{comments}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-blue-500 text-sm">{category}</span>
        <a
          href="#"
          className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </article>
);

PostCard.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

export default PostCard;
