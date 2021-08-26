const express = require("express");
const routes = express.Router();
const Movie = require("../model/movies.model");
const genres = require("../model/genres.model");
const { movieValidation } = require("../validadtion");

routes.get("/", async (req, res) => {
  const result = await Movie.find();
  res.send(result);
});

routes.get("/:id", async (req, res) => {
  const result = await Movie.findById(req.params.id);
  if (!result) return res.status(404).send("Data not found");
  res.send(result);
});

routes.post("/", async (req, res) => {
  const { error } = movieValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const data = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  const saveData = await data.save();
  res.send(saveData);
});

routes.put("/:id", async (req, res) => {
  const { error } = movieValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const result = await Movie.findByIdAndUpdate(
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

routes.delete("/:id", async (req, res) => {
  const result = await Movie.findByIdAndRemove(req.params.id);
  if (!result) return res.status(404).send("data not found");

  res.send(result);
});
module.exports = routes;
