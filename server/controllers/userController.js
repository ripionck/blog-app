const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const emailService = require("./emailController");
const utils = require("./utils");
require("dotenv").config();
const logger = require("../utils/logger");
const emailController = require("./emailController");

const signup = async function (userData) {
  try {
    const existingEmail = await UserModel.findOne({ email: userData.email });
    const existingNumber = await UserModel.findOne({
      phoneNumber: userData.phoneNumber,
    });

    if (existingEmail) {
      return {
        status: 409,
        message: "An account with this email already exists.",
      };
    }

    if (existingNumber) {
      return {
        status: 409,
        message: "An account with this phone number already exists.",
      };
    }

    const activationToken = jwt.sign(
      { email: userData.email, type: "activation" },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    const newUser = await UserModel.create({
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
    });

    logger.info(`Account successfully created for ${userData.email}`);

    emailController.sendActivationMail(
      userData.email,
      userData.firstname,
      activationToken,
    );
    logger.info(`Activation email sent to ${userData.email}`);

    delete newUser.password;

    const token = jwt.sign({ user: newUser }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return {
      status: 201,
      message:
        "Registration successful. An activation email has been sent to your email address.",
      token,
    };
  } catch (error) {
    logger.error(`Error during signup for ${userData.email}: ${error}`);
    return {
      status: 500,
      message: "An error occurred while processing your request.",
    };
  }
};

const resendActivationMail = async (email) => {
  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return { status: 404, message: "No user found with this email address." };
    }

    if (existingUser.active) {
      return { status: 208, message: "Your account is already activated." };
    }

    const activationToken = jwt.sign(
      { email, type: "activation" },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    emailController.sendActivationMail(
      email,
      existingUser.firstname,
      activationToken,
    );
    logger.info(`Activation email resent to ${email}`);

    return {
      status: 200,
      message: "Activation email has been resent to your email address.",
    };
  } catch (error) {
    logger.error(
      `Error while resending activation email for ${email}: ${error}`,
    );
    return {
      status: 500,
      message: "An error occurred while processing your request.",
    };
  }
};

const activateAccount = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.type !== "activation") {
      return { status: 400, message: "Invalid activation token." };
    }

    const user = await UserModel.findOneAndUpdate(
      { email: decoded.email },
      { $set: { active: true } },
      { new: true },
    );

    if (!user) {
      return { status: 404, message: "User not found." };
    }

    return { status: 200, message: "Account activated successfully!" };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { status: 400, message: "Activation link has expired." };
    }
    return { status: 500, message: "Invalid or corrupted activation link." };
  }
};

const login = async function (loginData) {
  try {
    const userWithEmail = await UserModel.findOne({ email: loginData.email });

    if (!userWithEmail) {
      logger.info(`Failed login attempt with email: ${loginData.email}`);
      return { status: 401, message: "Invalid email or password." };
    }

    const isValidPassword = await userWithEmail.isValidPassword(
      loginData.password,
    );

    if (!isValidPassword) {
      logger.info(
        `Failed login attempt due to incorrect password: ${loginData.email}`,
      );
      return { status: 401, message: "Invalid email or password." };
    }

    const userData = { ...userWithEmail._doc };
    delete userData.password;

    const token = jwt.sign({ user: userData }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    logger.info(`${loginData.email} logged in successfully.`);
    return { status: 201, message: "Login successful.", token };
  } catch (error) {
    logger.error(`Error during login for ${loginData.email}: ${error}`);
    return {
      status: 500,
      message: "An error occurred while processing your request.",
    };
  }
};

const forgotPassword = async (email) => {
  try {
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      logger.error(`Password reset requested for non-existent user: ${email}`);
      return { status: 404, message: "No user found with this email address." };
    }

    emailController.sendForgotPasswordMail(
      existingUser.email,
      existingUser.firstname,
      token,
    );

    logger.info(`Password reset email sent to ${email}`);
    return {
      status: 200,
      message: "Password reset email has been sent to your email address.",
    };
  } catch (error) {
    logger.error(`Error during password reset request for ${email}: ${error}`);
    return {
      status: 500,
      message: "An error occurred while processing your request.",
    };
  }
};

const resetPassword = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const email = decoded.email;

    const existingUser = await UserModel.findOne({ email });
    existingUser.password = password;
    await existingUser.save();

    logger.info(`Password successfully reset for ${email}`);
    return {
      status: 200,
      message: "Your password has been reset successfully.",
    };
  } catch (error) {
    logger.error(`Error during password reset: ${error}`);
    return { status: 500, message: "Invalid or expired reset token." };
  }
};

const userController = {
  signup,
  resendActivationMail,
  activateAccount,
  login,
  forgotPassword,
  resetPassword,
};

module.exports = userController;
