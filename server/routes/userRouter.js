const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

// Signup Route
userRouter.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const result = await userController.signup(userData);

    if (result.status === 201) {
      res
        .status(result.status)
        .json({ message: result.message, token: result.token });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
    });
  }
});

// Activate Account Route
userRouter.get("/activate", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Activation token is required." });
  }

  const result = await userController.activateAccount(token);

  if (result.status === 200) {
    return res.status(200).json({ message: "Account activated successfully!" });
  } else {
    return res.status(result.status).json({ error: result.message });
  }
});

// Resend Activation Email Route
userRouter.post("/resend-activation", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ error: "Email is required to resend the activation link." });
    }

    const result = await userController.resendActivationMail(email);

    if (result.status === 200) {
      res.status(result.status).json({ message: result.message });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
    });
  }
});

// Login Route
userRouter.post("/login", async (req, res) => {
  const loginData = req.body;
  const result = await userController.login(loginData);

  if (result.status === 200) {
    res
      .status(result.status)
      .json({ message: result.message, token: result.token });
  } else {
    res.status(result.status).json({ error: result.message });
  }
});

// Forgot Password Route
userRouter.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ error: "Email is required to reset the password." });
    }

    const result = await userController.forgotPassword(email);

    if (result.status === 200) {
      res.status(result.status).json({ message: result.message });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
    });
  }
});

// Reset Password Route
userRouter.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!newPassword || !token) {
      return res
        .status(400)
        .json({ error: "Both a valid token and new password are required." });
    }

    const result = await userController.resetPassword(token, newPassword);
    if (result.status === 200) {
      res.status(result.status).json({ message: result.message });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
    });
  }
});

module.exports = userRouter;
