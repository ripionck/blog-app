const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const result = await userController.signup(userData);

    if (result.status === 201) {
      res
        .status(result.status)
        .json({ message: result.message, token: result.token });
    } else if (result.status === 400) {
      res.status(result.status).json({ error: result.message });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = userRouter;
