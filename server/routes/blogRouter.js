const express = require("express");
const blogRouter = express.Router();
const blogController = require("../controllers/blogController");

const { authenticate, isActivated } = require("../middlewares/authMiddleware");
const { cloudinary } = require("../config/cloudinary.config");
const uploader = require("../config/multer.config");

blogRouter.post(
  "/create",
  authenticate,
  isActivated,
  uploader.single("file"),
  async (req, res) => {
    try {
      const authorId = req.user._id;
      let imageUrl = null;

      console.log("File received:", req.file);

      if (req.file) {
        try {
          const imageData = await cloudinary.uploader.upload(req.file.path);
          imageUrl = imageData.secure_url;
          console.log("Image uploaded to Cloudinary:", imageUrl);
        } catch (error) {
          console.error("Cloudinary upload error:", error.message);
          return res
            .status(500)
            .json({ error: "Failed to upload the file to Cloudinary." });
        }
      }

      const blogData = { imageUrl, ...req.body };
      const result = await blogController.createBlog(authorId, blogData);

      if (result.status === 201) {
        return res.status(result.status).json({
          message: result.message,
          blog: result.blog,
        });
      } else {
        return res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      console.error("Error while creating a blog:", error.message);
      return res
        .status(500)
        .json({ error: "Something went wrong. Please try again later." });
    }
  },
);

module.exports = blogRouter;
