import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import BlogCard from "./components/BlogCard";
import Pagination from "../../components/Pagination";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar
        searchQuery={searchQuery}
        onSearchQuery={setSearchQuery}
        isLoggedIn={isLoggedIn}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((post, index) => (
            <BlogCard
              key={index}
              {...post}
              likes={post.likes.length}
              comments={post.comments.length}
              onClick={() => handleBlogClick(post)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
