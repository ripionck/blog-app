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

commentRouter.use(authenticate);

commentRouter.post("", async (req, res) => {
  try {
    const blogId = req.body.blogId;
    const authorId = req.user._id;
    const { text, parentCommentId } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required in the body" });
    }

    const result = await commentController.addComment(authorId, blogId, {
      text,
      parentCommentId,
    });

    if (result.status === 201) {
      return res
        .status(result.status)
        .json({ message: result.message, data: result.data });
    } else {
      return res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error occurred while adding the comment:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

commentRouter.post("/:commentId/like", async (req, res) => {
  try {
    const userId = req.user._id;
    const commentId = req.params.commentId;

    const result = await commentController.toggleLikeComment(userId, commentId);

    if (result.status === 200) {
      return res
        .status(result.status)
        .json({ message: result.message, data: result.comment });
    } else {
      return res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error occurred while liking the comment:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

commentRouter.put("/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required in the body" });
    }

    const result = await commentController.updateComment(userId, commentId, {
      text,
    });

    if (result.status === 200) {
      return res
        .status(result.status)
        .json({ message: result.message, data: result.data });
    } else {
      return res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error occurred while updating the comment:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

commentRouter.delete("/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const result = await commentController.deleteComment(userId, commentId);

    if (result.status === 200) {
      return res
        .status(result.status)
        .json({ message: result.message, data: result.data });
    } else {
      return res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error occurred while deleting the comment:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = commentRouter;
