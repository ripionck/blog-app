import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import ProfilePage from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateBlogPost from "./pages/CreateBlog/CreateBlogPost";
import ActivateAccount from "./ActivateAccount";
import ActivationSuccess from "./pages/ActivationSuccess";
import ActivationError from "./pages/ActivationError";
import CheckEmail from "./CheckEmail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/activation-success" element={<ActivationSuccess />} />
        <Route path="/activation-error" element={<ActivationError />} />
        <Route path="/create-blog" element={<CreateBlogPost />} />
      </Routes>
    </Router>
  );
};

export default App;
