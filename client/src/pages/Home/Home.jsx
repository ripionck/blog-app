import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import BlogPostCard from "./components/BlogPostCard";
import Pagination from "./components/Pagination";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/blogs?page=${currentPage}&limit=${postsPerPage}`,
        );
        console.log(response.data.data);
        setBlogs(response.data.data.blogs);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handleBlogClick = (post) => {
    navigate(`/blog/${post.slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs &&
          blogs.map((post) => {
            return (
              <BlogPostCard
                key={post._id}
                post={post}
                onClick={() => handleBlogClick(post)}
              />
            );
          })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
