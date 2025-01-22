const Blog = require("../models/blog");
const User = require("../models/user");
const utils = require("./utils");
const mongoose = require("mongoose");

const logger = require("../utils/logger");

const createBlog = async (authorId, blogData) => {
  try {
    const { title, description, body, tags } = blogData;
    const imageUrl = blogData.imageUrl || null;

    if (!title || !body) {
      return {
        status: 400,
        message: "Title and body are required to create a blog.",
      };
    }

    const reading_time = utils.calculateReadingTime(body);
    const slug = utils.slugIt(title);

    const newBlog = await Blog.create({
      slug: slug,
      title: title,
      description: description,
      body: body,
      tags: tags,
      imageUrl: imageUrl,
      author: authorId,
      reading_time: reading_time,
    });

    logger.info(
      `User with ID: ${authorId} created a blog post with ID: ${newBlog._id}`,
    );
    return {
      status: 201,
      message: "Blog created successfully.",
      blog: newBlog,
    };
  } catch (error) {
    logger.error(
      `An error occurred while the user with ID: ${authorId} tried to create a blog post. Error: ${error.message}`,
    );
    return {
      status: 500,
      message:
        "An error occurred while creating the blog. Please try again later.",
    };
  }
};

const blogController = {
  createBlog,
};

module.exports = blogController;
