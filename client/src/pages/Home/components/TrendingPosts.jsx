import { Eye, MessageCircle } from "lucide-react";

const TrendingPosts = ({ posts }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Trending Now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="Author"
                className="w-8 h-8 rounded-full"
              />
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.time}</span>
            </div>
            <h3 className="text-lg font-bold mt-2">{post.title}</h3>
            <p className="text-gray-600 mt-1">{post.description}</p>
            <div className="mt-2 flex items-center space-x-4 text-gray-500 text-sm">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
              <div className="text-blue-500">{post.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;
