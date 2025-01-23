import CreateBlogPost from "./pages/Blogs/CreateBlogPost";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const App = () => {
  return (
    <div>
      <Register />
      <Login />
      <Home />
      <CreateBlogPost />
    </div>
  );
};

export default App;
