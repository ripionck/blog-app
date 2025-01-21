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
      return { status: 409, message: "Email already exists" };
    }

    if (existingNumber) {
      return { status: 409, message: "Phone number already exists" };
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

    logger.info(`Account created successfully for ${userData.email}`);

    logger.info(`Email activation process called for ${userData.email}`);
    emailController.sendActivationMail(
      userData.email,
      userData.firstname,
      activationToken,
    );

    delete newUser.password;

    const token = jwt.sign({ user: newUser }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return {
      status: 201,
      message: `success, an activation email has been sent to your mail`,
      token,
    };
  } catch (error) {
    logger.error(`Error occured while signup ${userData.email}, ${error}`);
    return { status: 500, message: error };
  }
};

const resendActivationMail = async (email) => {
  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      return { status: 404, message: "User with this email doesn't exist" };
    }

    if (existingUser.active) {
      return { status: 208, message: "Account already activated" };
    }

    const activationToken = jwt.sign(
      { email, type: "activation" },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    emailService.sendActivationMail(
      email,
      existingUser.firstname,
      activationToken,
    );
    logger.info(`Resend activation process triggered for user: ${email}`);

    return {
      status: 200,
      message: `success, an activation email will be re-send to your email`,
      token,
    };
  } catch (error) {
    logger.error(
      `Error occured while user: ${email} requested for re-send email activation`,
    );
    return { status: 500, message: error };
  }
};

const activateAccount = async (token) => {
  try {
    const validToken = jwt.verify(token, process.env.SECRET_KEY);

    if (validToken.type !== "activation") {
      return { status: 400, message: "Invalid activation code" };
    }

    const existingUser = await UserModel.findOneAndUpdate(
      { email: validToken.email },
      { $set: { active: true } },
      { new: true },
    );

    if (!existingUser) {
      return { status: 404, message: "User with email doesn't exist!!" };
    }

    logger.info(`User: ${existingUser.email} account activated successfully`);
    return { status: 200, message: "Account activated successfully" };
  } catch (error) {
    logger.error("Error occured while user try to active account");
    return { status: 500, message: error };
  }
};

const login = async function (loginData) {
  try {
    const userWithEmail = await UserModel.findOne({ email: loginData.email });

    if (!userWithEmail) {
      logger.info(`Incorrect login credentials from ${loginData.email}`);
      return { status: 401, message: "Incorrect login credentials." };
    }
    const isValidPassword = await userWithEmail.isValidPassword(
      loginData.password,
    );

    if (!isValidPassword) {
      logger.info(
        `Incorrect login credentials from ${loginData.email} due to incorrect password.`,
      );
      return { status: 401, message: "Incorrect login credentials." };
    } else {
      const userData = { ...userWithEmail._doc };
      delete userData["password"];
      delete userData["activationToken"];
      delete userData["updateAt"];

      const token = jwt.sign({ user: userData }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      logger.info(`${loginData.email} login successfull!!`);
      return { status: 201, message: "Success login!!" };
    }
  } catch (error) {
    logger.error(
      `Error occured while user ${loginData.email} try to login. \n ${error}`,
    );
    return { status: 500, message: "Internal server error" };
  }
};

const forgotPassword = async (email) => {
  try {
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    const existingUser = await UserModel.findOne({ email: email });

    logger.info(`user: ${email} requested for reset password mail`);

    if (!existingUser) {
      logger.error(
        `user: ${email} requested for reset password mail but user doesnt exist`,
      );
      return {
        status: 404,
        message: "User with this email doesn't exist",
      };
    }

    logger.info(`sendForgotPasswordMail proccess triggered for user: ${email}`);

    emailService.sendForgotPasswordMail(
      existingUser.email,
      existingUser.firstname,
      token,
    );

    return { status: 200, message: `Password reset message sent to your mail` };
  } catch (error) {
    logger.error(
      `Error Occured while user: ${email} requested for forgot password Email \n ${error}`,
    );
    return { status: 500, message: error };
  }
};

const resetPassword = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const email = decoded.email;
    logger.info(`user: ${email} started reset password`);
    const existingUser = await UserModel.findOne({ email: email });

    existingUser.password = password;
    await existingUser.save(); //triggers the pre save hook and hash the password

    logger.info(`user: ${email} reset password succesfully`);

    return { status: 200, message: `Password has been reset sucessfully!!` };
  } catch (error) {
    logger.error(
      `Error occured while user: ${email} trying to reset password. \n ${error}`,
    );
    return { status: 500, message: `Invalid or expired reset token.` };
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
