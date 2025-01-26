import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import ProfilePage from "./pages/profile/ProfilePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateBlogPost from "./pages/CreateBlog/CreateBlogPost";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/create-post" element={<CreateBlogPost />} />
      </Routes>
    </Router>
  );
};

export default App;
