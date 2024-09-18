const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");

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

const loginController = () => {};

module.exports = {
  loginController,
  registerController,
};
