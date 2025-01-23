import { useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import NavigationTabs from "./components/NavigationTabs";
import PostCard from "./components/PostCard";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfileHeader
        initials="JD"
        name="John Doe"
        title="Web Developer & Technical Writer"
        description="Passionate about web development and sharing knowledge through technical writing."
        posts={24}
        likes="1.2k"
        comments={304}
      />

      <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="mt-8 space-y-8">
        {activeTab === "posts" && (
          <>
            <PostCard
              date="March 15, 2024"
              title="Understanding React Hooks"
              description="A comprehensive guide to React Hooks and how they can improve your code..."
              likes={156}
              comments={23}
              category="Technology"
            />
            <PostCard
              date="March 10, 2024"
              title="Best Practices for Clean Code"
              description="Essential principles and practices for writing maintainable code..."
              likes={98}
              comments={15}
              category="Development"
            />
          </>
        )}
        {activeTab === "drafts" && (
          <div className="text-center text-gray-500">
            <p>No drafts available.</p>
          </div>
        )}
        {activeTab === "liked" && (
          <>
            <PostCard
              date="February 20, 2024"
              title="Introduction to TypeScript"
              description="Learn the basics of TypeScript and how it can enhance your JavaScript development..."
              likes={200}
              comments={30}
              category="Programming"
            />
            <PostCard
              date="January 5, 2024"
              title="Advanced CSS Techniques"
              description="Explore advanced CSS techniques to create stunning web designs..."
              likes={150}
              comments={25}
              category="Design"
            />
          </>
        )}
        {activeTab === "comments" && (
          <div className="text-center text-gray-500">
            <p>No comments available.</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
