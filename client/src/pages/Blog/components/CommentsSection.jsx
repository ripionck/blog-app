import PropTypes from "prop-types";
import { Heart, MoreHorizontal } from "lucide-react";

const CommentsSection = ({ comments }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900">
        Comments ({comments.length})
      </h2>
      <div className="mt-8 space-y-6">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-4 p-4 rounded-lg hover:bg-gray-50"
          >
            <img
              src="/placeholder.svg"
              alt="Author"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {comment.author}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-gray-700">{comment.text}</p>
              <div className="mt-2 flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                  <Heart className="h-4 w-4" />
                  <span>{comment.likes.length}</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CommentsSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};

export default CommentsSection;
