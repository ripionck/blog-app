import { Heart, MessageCircle } from "lucide-react";

export default function PostPreview({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">{post.category}</span>
            <span className="text-sm text-gray-400">{post.date}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 line-clamp-2">{post.content}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-gray-500">
            <Heart className="h-4 w-4" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <MessageCircle className="h-4 w-4" />
            {post.comments}
          </span>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Read More →
        </button>
      </div>
    </div>
  );
}
