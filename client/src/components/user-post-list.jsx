import { Heart, MessageCircle } from "lucide-react";

export default function UserPostList({ posts }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>{post.date}</span>
                <span className="text-blue-600">{post.category}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600">{post.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-gray-500">
                <Heart className="h-5 w-5" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <MessageCircle className="h-5 w-5" />
                {post.comments}
              </span>
            </div>
            <button className="text-blue-600 hover:text-blue-700">
              Read More →
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
}
