const config = require("./utils/config");
const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

module.exports = app;
