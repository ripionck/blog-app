const RecommendedPosts = ({ posts }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
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
              <div className="mt-2 text-gray-500 text-sm">
                {post.readTime} • {post.views} views
              </div>
            </div>
            <button className="text-blue-500 font-bold">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPosts;
