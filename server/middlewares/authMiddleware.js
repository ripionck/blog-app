const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return res.status(401).json({
        message: "Authentication credentials not provided. Please log in.",
      });
    }

    const [type, token] = authToken.split(" ");
    if (type !== "Bearer" || !token) {
      return res.status(400).json({
        message:
          "Invalid authorization header format. Expected 'Bearer <token>'.",
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decodedToken) => {
      if (error) {
        return res.status(401).json({
          message: "Invalid or expired token. Please log in again.",
        });
      }

      // Ensure the token contains a user object
      if (!decodedToken.user) {
        return res.status(400).json({
          message: "Malformed token. User information is missing.",
        });
      }

      req.user = decodedToken.user; // Set the user from the token to the request
      next(); // Proceed to the next middleware or route
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      message: "An error occurred during authentication. Please try again.",
    });
  }
};

const isActivated = (req, res, next) => {
  try {
    // Check if the `req.user` object is valid and contains the `active` field
    if (!req.user || req.user.active !== true) {
      return res.status(403).json({
        message:
          "Account not activated. Please activate your account to perform this action.",
      });
    }

    next(); // Proceed if the account is activated
  } catch (error) {
    console.error("Account activation check error:", error);
    return res.status(500).json({
      message:
        "An error occurred while verifying account activation. Please try again.",
    });
  }
};

module.exports = { authenticate, isActivated };
