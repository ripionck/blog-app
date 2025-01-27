import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogPost from "../../components/blog/BlogPost";
import CommentsSection from "../../components/blog/CommentsSection";

const Blog = () => {
  const { slug } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [comments, setComments] = useState([]);
  console.log(blogData);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Fetch blog details
        const blogResponse = await axios.get(
          `http://localhost:3001/api/blogs/${slug}`,
        );
        setBlogData(blogResponse.data.blog);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [slug]);

  useEffect(() => {
    if (blogData) {
      const fetchComments = async () => {
        try {
          // Fetch comments for the blog
          const commentsResponse = await axios.get(
            `http://localhost:3001/api/comments?blogId=${blogData._id}`,
          );
          setComments(commentsResponse.data.data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };

      fetchComments();
    }
  }, [blogData]);

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-8">
        <BlogPost blog={blogData} />
        <CommentsSection comments={comments} />
      </article>
    </div>
  );
};

export default Blog;
