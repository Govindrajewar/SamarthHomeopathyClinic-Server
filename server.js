// main file
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// Date & time
const date = new Date();
const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

// routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Samarth Homeopathy Clinic Server running",
    date: formattedDate,
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_MODE} on port ${PORT}`);
});
