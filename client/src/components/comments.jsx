import { useState } from "react";

export default function Comments({ comments }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new comment logic here
    setNewComment("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px]"
        />
        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-100 pb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900">{comment.author}</h3>
              <span className="text-sm text-gray-500">{comment.timestamp}</span>
            </div>
            <p className="text-gray-600">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
