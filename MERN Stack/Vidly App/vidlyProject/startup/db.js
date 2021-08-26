require("dotenv").config();
const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose.connect(
    process.env.database,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  },
    () => {
      winston.info("Mongo DB Connected");
    }
  );
};
