import PropTypes from "prop-types";
import { Heart, MessageCircle } from "lucide-react";

const BlogPostCard = ({ post, onClick }) => {
  const getTagColor = (tag) => {
    switch (tag) {
      case "programming":
        return "bg-indigo-100 text-indigo-800";
      case "web":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <article
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(
              post.tags[0],
            )}`}
          >
            {post.tags[0]}
          </span>
          <span className="text-sm text-gray-500">
            {post.reading_time} min read
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.firstname}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-700">
              {post.author.firstname} {post.author.lastname}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">{post.likes.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {post.comments.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

BlogPostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reading_time: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    author: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    imageUrl: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BlogPostCard;
