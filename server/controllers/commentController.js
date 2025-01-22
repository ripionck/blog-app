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

const addComment = async (authorId, blogId, commentData) => {
  try {
    const { text, parentCommentId } = commentData;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return {
        status: 404,
        message: `Blog with ID ${blogId} not found`,
        data: null,
      };
    }

    const parentComment = parentCommentId
      ? await Comment.findById(parentCommentId)
      : null;

    const comment = new Comment({ text, author: authorId });

    if (parentComment) {
      parentComment.replies.push(comment);
      await parentComment.save();
    } else {
      blog.comments.push(comment);
      await blog.save();
    }

    await comment.save();

    return {
      status: 201,
      message: "Comment added successfully",
      data: comment,
    };
  } catch (error) {
    console.error("Error occurred while adding the comment:", error.message);
    return { status: 500, message: "An error occurred", error: error.message };
  }
};

const updateComment = async (authorId, commentId, updateData) => {
  try {
    const { text } = updateData;

    const comment = await Comment.findOne({
      _id: commentId,
      author: authorId,
      is_deleted: false,
    });

    if (!comment) {
      return {
        status: 404,
        message: "Comment not found or doesn't belong to you",
        data: null,
      };
    }

    comment.text = text;
    await comment.save();

    return {
      status: 200,
      message: "Comment updated successfully",
      data: comment,
    };
  } catch (error) {
    console.error("Error occurred while updating the comment:", error.message);
    return { status: 500, message: "An error occurred", error: error.message };
  }
};

const deleteComment = async (authorId, commentId) => {
  try {
    const comment = await Comment.findOne({
      _id: commentId,
      author: authorId,
      is_deleted: false,
    });

    if (!comment) {
      return {
        status: 404,
        message: "Comment not found or doesn't belong to you",
        data: null,
      };
    }

    comment.is_deleted = true;
    await comment.save();

    logger.info(
      `User with ID: ${authorId} deleted comment: ${commentId} successfully`,
    );

    return {
      status: 200,
      message: "Comment deleted successfully",
      data: comment,
    };
  } catch (error) {
    console.error("Error occurred while deleting the comment:", error.message);
    logger.error(
      `Error occurred while user with ID: ${authorId} tried to delete comment: ${commentId}\n${error.message}`,
    );
    return { status: 500, message: "An error occurred", error: error.message };
  }
};

const toggleLikeComment = async (userId, commentId) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return {
        status: 404,
        message: "Comment not found or does not exist",
        data: null,
      };
    }

    const isLiked = comment.likes.includes(userId);

    if (isLiked) {
      comment.likes = comment.likes.filter(
        (like) => like.toString() !== userId,
      );
    } else {
      comment.likes.push(userId);
    }

    await comment.save();

    logger.info(
      `User with ID: ${userId} ${
        isLiked ? "unliked" : "liked"
      } comment: ${commentId} successfully`,
    );

    return {
      status: 200,
      message: `Comment ${isLiked ? "unliked" : "liked"} successfully`,
      comment: comment,
    };
  } catch (error) {
    console.error(
      "Error occurred while toggling like on the comment:",
      error.message,
    );
    logger.error(
      `Error occurred while user with ID: ${userId} tried to toggle like on comment: ${commentId}\n${error.message}`,
    );
    return { status: 500, message: "An error occurred", error: error.message };
  }
};

const commentController = {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
  toggleLikeComment,
};

module.exports = commentController;
