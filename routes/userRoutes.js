const express = require("express");
const {
  loginController,
  registerController,
  authenticateController,
} = require("../controllers/userControllers");
const isAuthenticate = require("../middlewares/isAuthenticate");

const router = express.Router();

// routes
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/getUserData", isAuthenticate, authenticateController);

module.exports = router;
