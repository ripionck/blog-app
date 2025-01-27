import { Heart, MessageCircle, Twitter, Linkedin } from "lucide-react";

export default function BlogPost({ post }) {
  return (
    <article className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <span className="text-blue-600">{post.category}</span>
        <h1 className="text-4xl font-bold mt-2 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 gap-4">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <div className="ml-auto flex gap-2">
            <Twitter className="h-5 w-5 cursor-pointer hover:text-blue-400" />
            <Linkedin className="h-5 w-5 cursor-pointer hover:text-blue-700" />
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">{post.content}</p>

        <div className="bg-gray-50 rounded-lg p-4 my-6">
          <code className="text-sm font-mono">
            {"const [count, setCount] = useState(0);"}
            <br />
            {"const increment = () => setCount((prev) => prev + 1);"}
          </code>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6 pt-6 border-t">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <Heart className="h-5 w-5" />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <MessageCircle className="h-5 w-5" />
          <span>{post.comments}</span>
        </button>
      </div>
    </article>
  );
}
