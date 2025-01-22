const express = require("express");
const commentRouter = express.Router();
const { authenticate, isActivated } = require("../middlewares/authMiddleware");
const commentController = require("../controllers/commentController");

commentRouter.get("", async (req, res) => {
  try {
    const blogId = req.query.blogId;

    const result = await commentController.getComments(blogId);

    if (result.status === 200) {
      return res
        .status(result.status)
        .json({ message: result.message, data: result.comments });
    } else {
      return res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error occurred while fetching comments:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

commentRouter.get("/:commentId", async (req, res) => {
  try {
    const blogId = req.query.blogId;
    const commentId = req.params.commentId;

    const result = await commentController.getComment(blogId, commentId);

    if (result.status === 200) {
      return res
        .status(result.status)
        .json({ message: result.message, data: result.comment });
    } else {
      return res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error occurred while fetching the comment:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = commentRouter;
