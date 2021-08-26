const winston = require("winston");
require("winston-mongodb");
require("dotenv").config();
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtException.log" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );
  // Uncaught exception if occurs anywhere in project
  process.on("unhandleRejection", (ex) => {
    throw ex;
  });

  winston.add(
    new winston.transports.File({ filename: "error.log" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );
  winston.add(
    new winston.transports.MongoDB({ db: process.env.database, level: "error" })
  );
};
