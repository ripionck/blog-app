const nodemailer = require("nodemailer");
require("dotenv").config();

const logger = require("../utils/logger");

const config = {
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE || false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const sendMail = async (data) => {
  const transporter = nodemailer.createTransport(config);
  try {
    await transporter.sendMail(data);
    logger.info(`Email "${data.subject}" sent successfully to ${data.to}`);
  } catch (err) {
    logger.error(`Error sending email to ${data.to}: ${err.message}`);
    throw new Error(`Error sending email to ${data.to}: ${err.message}`);
  }
};

const generateActivationUrl = async (activationToken) => {
  const webURL = process.env.WEB_URL || "http://localhost:5174";
  return `${webURL}/activate?token=${activationToken}`;
};

const sendActivationMail = async (email, firstname, activationToken) => {
  const activationUrl = await generateActivationUrl(activationToken);

  const emailData = {
    from: config.auth.user,
    to: email,
    subject: "Activate Your Account",
    text: `
  Hi ${firstname},

  Welcome to our platform! We're excited to have you on board. To complete your registration and activate your account, please click the link below:

  Activate Your Account: ${activationUrl}

  If you did not create an account with us, please ignore this email.

  Best regards,  
  The Team
    `,
  };

  try {
    await sendMail(emailData);
    console.log(`Activation email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending activation email to ${email}:`, error.message);
    throw error;
  }
};

const sendForgotPasswordMail = async (email, firstname, token) => {
  const webURL = process.env.WEB_URL || "http://localhost:5174";
  const url = `${webURL}/reset-password/${token}`;

  const emailData = {
    from: config.auth.user,
    to: email,
    subject: "Password Reset Request",
    text: `
    Hi ${firstname},

    We received a request to reset the password for your account. If you made this request, you can reset your password using the link below:

    Reset Your Password: ${url}

    If you did not request a password reset, please ignore this email. Your account remains secure.

    Best regards,  
    The BlogApp Team
    `,
  };

  try {
    await sendMail(emailData);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error(
      `Error sending password reset email to ${email}:`,
      error.message,
    );
    throw error;
  }
};

const emailController = {
  sendMail,
  sendActivationMail,
  sendForgotPasswordMail,
};

module.exports = emailController;
