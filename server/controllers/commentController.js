const Blog = require("../models/blog");
const Comment = require("../models/comment");
const logger = require("../utils/logger");

const getComments = async (blogId) => {
  try {
    const blog = await Blog.findById(blogId).populate("comments");

    if (!blog) {
      return {
        status: 404,
        message: `Blog with ID ${blogId} not found`,
        data: null,
      };
    }

    const comments = blog.comments;

    return {
      status: 200,
      message: "Comments fetched successfully",
      comments: comments,
    };
  } catch (error) {
    console.error("Error occurred while fetching comments:", error.message);
    return { status: 500, message: "Server error", data: null };
  }
};

const getComment = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId).populate("replies");

    if (!comment) {
      return {
        status: 404,
        message: `Comment with ID ${commentId} not found`,
        data: null,
      };
    }

    return {
      status: 200,
      message: "Comment fetched successfully",
      comment: comment,
    };
  } catch (error) {
    console.error("Error occurred while fetching the comment:", error.message);
    return { status: 500, message: "Server error", data: null };
  }
};

const commentController = { getComments, getComment };

module.exports = commentController;
