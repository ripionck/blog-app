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

const updateBlog = async (authorId, blogId, updateBlogData) => {
  try {
    const blogExist = await Blog.findOne({ _id: blogId, author: authorId });

    if (!blogExist) {
      return {
        status: 404,
        message: `Blog with ID ${blogId} not found or doesn't belong to you`,
      };
    }

    let slug;
    let reading_time;

    if (updateBlogData.body) {
      reading_time = utils.calculateReadingTime(updateBlogData.body);
    }

    if (updateBlogData.title) {
      slug = utils.slugIt(updateBlogData.title);
    }

    blogExist.title = updateBlogData.title || blogExist.title;
    blogExist.description = updateBlogData.description || blogExist.description;
    blogExist.tags = updateBlogData.tags || blogExist.tags;
    blogExist.body = updateBlogData.body || blogExist.body;
    blogExist.slug = slug || blogExist.slug;
    blogExist.reading_time = reading_time || blogExist.reading_time;
    blogExist.state = updateBlogData.state || blogExist.state;

    await blogExist.save();

    logger.info(
      `User with ID: ${authorId} updated blog: ${blogId} successfully`,
    );

    return {
      status: 200,
      message: "Blog updated successfully",
      blog: blogExist,
    };
  } catch (error) {
    console.error("Error occurred while updating the blog:", error.message);
    logger.error(
      `Error occurred while user with ID: ${authorId} tried to update blog: ${blogId}\n${error.message}`,
    );
    return {
      status: 500,
      message: "Error updating the blog",
      error: error.message,
    };
  }
};

const getMyBlogs = async (authorId, params) => {
  try {
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 20;
    const skip = (page - 1) * limit;
    const tags = params.tags ? params.tags : null;
    const orderBy = params.orderBy || "-timestamp";

    const searchCriteria = {
      author: authorId,
      state: { $in: ["draft", "published"] },
      ...(tags && { tags: { $in: tags } }),
    };

    const blogs = await Blog.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort(orderBy)
      .exec();

    const total = await Blog.countDocuments(searchCriteria);

    logger.info(`User: ${authorId} fetched their blog posts successfully`);

    return {
      status: 200,
      message: "Your owned blogs fetched successfully",
      data: { blogs, page, limit, total },
    };
  } catch (error) {
    console.error("Error occurred while fetching user blogs:", error.message);
    logger.error(
      `Error occurred while user with ID: ${authorId} tried to fetch their blogs\n${error.message}`,
    );
    return { status: 500, message: "An error occurred", error: error.message };
  }
};

const deleteBlog = async (authorId, blogId) => {
  try {
    const blog = await Blog.findOneAndDelete({ author: authorId, _id: blogId });

    if (!blog) {
      return {
        status: 404,
        message: `Blog with ID ${blogId} not found or doesn't belong to you`,
      };
    }

    logger.info(
      `User with ID: ${authorId} deleted blog: ${blogId} successfully`,
    );

    return {
      status: 200,
      message: `Blog with ID ${blogId} deleted successfully`,
      blog,
    };
  } catch (error) {
    console.error("Error occurred while deleting the blog:", error.message);
    logger.error(
      `Error occurred while user with ID: ${authorId} tried to delete blog: ${blogId}\n${error.message}`,
    );
    return {
      status: 500,
      message: "Error deleting the blog",
      error: error.message,
    };
  }
};

const publishBlog = async (authorId, blogId) => {
  try {
    const blog = await Blog.findOne({ author: authorId, _id: blogId });

    if (!blog) {
      return {
        status: 404,
        message: `Blog with ID ${blogId} not found or doesn't belong to you`,
      };
    }

    blog.state = "published";
    await blog.save();

    logger.info(
      `User with ID: ${authorId} published blog: ${blogId} successfully`,
    );

    const author = await User.findById(authorId);
    const authorData = { ...author._doc };
    delete authorData.password;

    return {
      status: 200,
      message: "Blog published successfully",
      blog,
      author: authorData,
    };
  } catch (error) {
    console.error("Error occurred while publishing the blog:", error.message);
    logger.error(
      `Error occurred while user with ID: ${authorId} tried to publish blog: ${blogId}\n${error.message}`,
    );
    return {
      status: 500,
      message: "Error publishing the blog",
      error: error.message,
    };
  }
};

const blogController = {
  createBlog,
  getBlogs,
  getBlog,
  getMyBlogs,
  updateBlog,
  deleteBlog,
  publishBlog,
};

module.exports = blogController;
