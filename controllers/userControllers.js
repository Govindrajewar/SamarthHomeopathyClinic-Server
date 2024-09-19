const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        message: "Email already exists",
        success: false,
      });
    }

    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    newUser.save();
    res.status(200).send({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: `Register Controller Error: ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    // check user exist
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }

    // check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      });
    }

    // generate JWT token for user authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "5d", // TODO: expiresIn: "1h",
    });

    res.status(200).send({
      message: "User Logged in Successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: `Login Controller Error: ${error.message}`,
      success: false,
    });
  }
};

const authenticateController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });

    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: `Authenticate Controller Error: ${error.message}`,
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authenticateController,
};
