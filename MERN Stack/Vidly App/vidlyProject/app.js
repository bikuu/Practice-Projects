require("express-async-errors");
const cors = require("cors");

const joi = require("joi");
require("dotenv").config();
//validate objectid on all collection throuth here
joi.objectId = require("joi-objectid")(joi);

const express = require("express");
const winston = require("winston");

const app = express();
app.use(cors());
const server = app.listen(process.env.PORT, () => {
  winston.info(`Listening to port ${process.env.PORT}`);
});
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

app.get("/", (req, res) => {
  res.send("Hello World");
});


module.exports = server;
