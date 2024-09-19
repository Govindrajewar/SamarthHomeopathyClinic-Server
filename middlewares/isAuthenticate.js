const JWT = require("jsonwebtoken");

// Middleware to verify JWT token
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res
        .status(200)
        .send({ message: "Token not provided", success: false });
    }

    JWT.verify(token, process.env.JWT_TOKEN, (err, user) => {
      if (err) {
        return res
          .status(200)
          .send({ message: "Invalid token", success: false });
      } else {
        req.body.userId = user.id;
        next();
      }
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).send({ message: "Server error" });
  }
};
