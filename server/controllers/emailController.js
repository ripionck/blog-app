const nodemailer = require("nodemailer");
require("dotenv").config();

const logger = require("../utils/logger");

const webURL = process.env.webURL || "";

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
  transporter.sendMail(data, (err, info) => {
    if (err) {
      `Error sending mail to ${data.to}`;
      logger.error(`Error sending ${data.subject} to ${data.to}, \n ${err}`);
      err;
    } else {
      logger.info(`Email ${data.subject} sent successfully to ${data.to}`)(
        info.response,
      );
    }
  });
};

const generateActivationUrl = async (activationToken) => {
  return `${webURL}/active-account?token=${activationToken}`;
};

const sendActivationMail = async (email, firstname, activationToken) => {
  const activationUrl = await generateActivationUrl(activationToken);

  const data = {
    from: config.auth.user,
    to: email,
    subject: `Email Activation Message.`,
    text: `
    Dear ${firstname},

    Welcome to BlogApp, we're excited to have you as a part of our community.

    ${activationUrl}
    
    If you didn't request this activation, please ignore this message. Your account won't be activated until you click the link above.

    Thank you for choosing BlogApp. We look forward to providing you with a great experience.

    Best regards,
    The BlogApp Team
    `,
  };

  sendMail(data);
};

const sendForgotPasswordMail = async (email, firstname, token) => {
  const url = `${webURL}/reset-password/${token}`;

  const data = {
    from: config.auth.user,
    to: email,
    subject: "Password Reset Request",
    text: ` 
    Hi ${firstname},

    You've requested a password reset for your account. To reset your password, please visit the following link:

    Reset Your Password: ${url}

    If you didn't request a password reset, you can ignore this email.

    Best regards,
    The BlogApp Team
    `,
  };

  sendMail(data);
};

const emailService = {
  sendMail,
  sendActivationMail,
  sendForgotPasswordMail,
};

module.exports = emailService;
