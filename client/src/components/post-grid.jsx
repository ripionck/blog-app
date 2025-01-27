import PostPreview from "./post-preview";

export default function PostGrid({ posts }) {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
}
