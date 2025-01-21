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

const userController = { signup };

module.exports = userController;
