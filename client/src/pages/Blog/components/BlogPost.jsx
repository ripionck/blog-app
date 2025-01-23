import { Twitter, Linkedin, ThumbsUp, MessageSquare } from "lucide-react";
import PropTypes from "prop-types";

const BlogPost = ({ blog }) => {
  return (
    <article className="py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-600 text-sm">Technology</span>
          <span className="text-gray-500 text-sm">
            {new Date(blog.timestamp).toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">
              By {blog.author.firstname} {blog.author.lastname}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{blog.reading_time} min read</span>
          </div>
          <div className="flex gap-3">
            <button className="hover:bg-gray-100 p-2 rounded-full">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="hover:bg-gray-100 p-2 rounded-full">
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </div>

        <img src={blog.imageUrl} alt="Cover" className="mt-4 rounded-lg" />
      </header>

      <div className="prose max-w-none">
        <p className="text-gray-700 mb-8">{blog.body}</p>
      </div>
      <div className="flex items-center gap-6 my-8 pt-4 border-t">
        <button className="flex items-center gap-2 text-gray-600">
          <ThumbsUp className="w-6 h-6" />
          {blog.likes.length} likes
        </button>
        <button className="flex items-center gap-2 text-gray-600">
          <MessageSquare className="w-6 h-6" />
          {blog.comments.length} comments
        </button>
      </div>
    </article>
  );
};

BlogPost.propTypes = {
  blog: PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
    }).isRequired,
    reading_time: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        author: PropTypes.shape({
          firstname: PropTypes.string.isRequired,
          lastname: PropTypes.string.isRequired,
        }).isRequired,
        timestamp: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default BlogPost;
