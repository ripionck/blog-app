import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogHeader from "./components/BlogHeader";
import EngagementBar from "./components/EngagementBar";
import BlogContent from "./components/BlogContent";
import TagsSection from "./components/TagsSection";
import AuthorBio from "./components/AuthorBio";
import CommentsSection from "./components/CommentsSection";

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
          console.log(commentsResponse.data.data);
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
        <BlogHeader
          author={blogData.author}
          title={blogData.title}
          publishDate={blogData.timestamp}
          readingTime={blogData.reading_time}
          category="Technology"
        />
        <div className="relative h-[400px] mb-8 rounded-xl overflow-hidden">
          <img
            src={blogData.imageUrl}
            alt="Blog cover"
            className="object-cover w-full h-full"
          />
        </div>
        <EngagementBar likes={blogData.likes} readCount={blogData.read_count} />
        <BlogContent content={blogData.body} />
        <TagsSection tags={blogData.tags} />
        <AuthorBio author={blogData.author} />
        <CommentsSection comments={comments} />
      </article>
    </div>
  );
};

export default Blog;
