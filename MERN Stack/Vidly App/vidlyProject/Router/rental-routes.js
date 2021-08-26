const express = require("express");
const routes = express.Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Rental = require("../model/rentals.model");
const Customer = require("../model/customers.model");
const Movie = require("../model/movies.model");
const { rentalValidation } = require("../validadtion");

Fawn.init(mongoose);

routes.get("/", auth, async (req, res) => {
  const result = await Rental.find();
  res.send(result);
});

routes.get("/:id", auth, async (req, res) => {
  const result = await Rental.findById(req.params.id);
  if (!result) return res.status(404).send("Data not found");
  res.send(result);
});

routes.post("/", auth, async (req, res) => {
  const { error } = rentalValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  const data = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      // isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  try {
    new Fawn.Task()
      .save("rentals", data)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
    res.send(data);
  } catch (error) {
    res.status(500).send("Somthing failed");
  }
});

routes.put("/:id", auth, async (req, res) => {
  const { error } = rentalValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await Rental.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!result) return res.status(404).send("data not found");

  res.send(result);
});

routes.delete("/:id", [auth, admin], async (req, res) => {
  const result = await Rental.findByIdAndRemove(req.params.id);
  if (!result) return res.status(404).send("data not found");

  res.send(result);
});
module.exports = routes;
