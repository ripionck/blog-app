import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import TrendingPosts from "./components/TrendingPosts";
import RecommendedPosts from "./components/RecomendedPosts";
import PopularTags from "./components/PopularTags";

const Home = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const trending = [
        {
          id: 1,
          author: "John Doe",
          time: "2 hours ago",
          title: "The Future of Web Development",
          description:
            "Exploring the latest trends and technologies shaping the future of web development...",
          views: 2100,
          comments: 42,
          tag: "#webdev",
        },
        {
          id: 2,
          author: "Jane Smith",
          time: "3 hours ago",
          title: "Top 10 JavaScript Frameworks in 2025",
          description:
            "A detailed guide to the top JavaScript frameworks to look out for this year...",
          views: 1800,
          comments: 30,
          tag: "#javascript",
        },
        {
          id: 3,
          author: "Mike Brown",
          time: "5 hours ago",
          title: "How React Revolutionized UI Development",
          description:
            "Examining how React has changed the way we build user interfaces in web development...",
          views: 2500,
          comments: 50,
          tag: "#react",
        },
      ];

      const recommended = [
        {
          id: 1,
          author: "Sarah Johnson",
          time: "1 day ago",
          title: "Getting Started with TailwindCSS",
          description:
            "A comprehensive guide to setting up and using TailwindCSS in your projects...",
          readTime: "8 min read",
          views: 1500,
        },
        {
          id: 2,
          author: "David Lee",
          time: "2 days ago",
          title: "Mastering CSS Grid Layouts",
          description:
            "Learn how to create responsive grid layouts using modern CSS techniques...",
          readTime: "12 min read",
          views: 2200,
        },
      ];

      setTrendingPosts(trending);
      setRecommendedPosts(recommended);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <SearchBar />
        <TrendingPosts posts={trendingPosts} />
        <RecommendedPosts posts={recommendedPosts} />
        <PopularTags />
      </div>
    </div>
  );
};

export default Home;
