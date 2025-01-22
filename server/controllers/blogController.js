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

const getBlogs = async (params) => {
  try {
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 20;
    const skip = (page - 1) * limit;
    const search = params.q || "";
    const author = params.author || null;
    const tags = params.tags || null;
    const orderBy = params.orderBy || "-timestamp";

    const searchCriteria = {
      $or: [
        { author: author },
        { title: { $regex: search, $options: "i" } },
        { tags: { $in: [tags] } },
      ],
      state: "published",
    };

    console.log("Search Criteria:", searchCriteria);

    const blogs = await Blog.find(searchCriteria)
      .populate("author", "firstname lastname email")
      .skip(skip)
      .limit(limit)
      .sort(orderBy)
      .exec();

    const total = await Blog.countDocuments(searchCriteria);

    const totalPage = Math.ceil(total / limit);
    logger.info("Blog posts fetched successfully");

    return {
      status: 200,
      message: "Success",
      data: { blogs, page, limit, total, totalPage },
    };
  } catch (error) {
    console.error("Error occurred while fetching blog posts:", error.message);
    logger.error(`Error occurred while fetching blog posts: ${error.message}`);
    return { status: 500, message: "An error occurred", error: error.message };
  }
};

const getBlog = async (blogIdOrSlug) => {
  try {
    let blog;

    if (mongoose.Types.ObjectId.isValid(blogIdOrSlug)) {
      blog = await Blog.findOne({
        _id: blogIdOrSlug,
        state: "published",
      })
        .populate({
          path: "author",
          select: "_id firstname lastname email",
        })
        .exec();
    } else {
      blog = await Blog.findOne({
        slug: blogIdOrSlug,
        state: "published",
      })
        .populate({
          path: "author",
          select: "_id firstname lastname email",
        })
        .exec();
    }

    if (blog) {
      blog.read_count += 1;
      await blog.save();

      logger.info(
        `Blog post with idOrSlug: ${blogIdOrSlug} returned successfully`,
      );

      return {
        status: 200,
        message: "Blog fetched successfully",
        blog: blog,
        author: blog.author,
      };
    } else {
      logger.info(`Blog post with idOrSlug: ${blogIdOrSlug} not found`);
      return { status: 404, message: "Blog not found" };
    }
  } catch (error) {
    console.error("Error occurred while fetching blog post:", error.message);
    logger.error(
      `Error occurred while fetching blog post with idOrSlug: ${blogIdOrSlug}\n${error.message}`,
    );
    return { status: 500, message: "An error occurred", error: error.message };
  }
};

const blogController = {
  createBlog,
  getBlogs,
  getBlog,
};

module.exports = blogController;
