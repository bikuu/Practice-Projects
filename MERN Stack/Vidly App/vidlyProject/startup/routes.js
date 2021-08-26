const express = require("express");

const GenreRoute = require("../Router/genre-routes");
const CustommerRoute = require("../Router/customer-routes");
const MovieRoute = require("../Router/movie-routes");
const RentalRoute = require("../Router/rental-routes");
const UserRoute = require("../Router/users-routes");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", GenreRoute);
  app.use("/api/customer", CustommerRoute);
  app.use("/api/movie", MovieRoute);
  app.use("/api/rental", RentalRoute);
  app.use("/api/user", UserRoute);
  app.use(error);
  
};
