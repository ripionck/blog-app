import PropTypes from "prop-types";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CommentsSection = ({ comments }) => {
  return (
    <section className="px-8 mt-8">
      <h3 className="text-xl font-semibold mb-6">Comments</h3>

      <div className="mb-8">
        <textarea
          placeholder="Add a comment..."
          className="w-full p-4 border rounded-lg mb-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Post Comment
        </button>
      </div>

      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div key={index} className="border-b pb-6">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                {comment.author.firstname} {comment.author.lastname}
              </span>
              <span className="text-gray-500 text-sm">
                {formatDate(comment.timestamp)}
              </span>
            </div>
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

CommentsSection.propTypes = {
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
};

export default CommentsSection;
