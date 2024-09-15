// main file
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_MODE} on port ${PORT}`);
});
