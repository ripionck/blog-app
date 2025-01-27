const config = require("./utils/config");
const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");
const commentRouter = require("./routes/commentRouter");

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);

module.exports = app;
