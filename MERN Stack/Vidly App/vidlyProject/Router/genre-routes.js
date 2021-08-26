const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const routes = express.Router();
const auth = require('../middleware/auth');
const genres = require("../model/genres.model");
const { genreValidation } = require("../validadtion");

routes.get("/", async (req, res) => {
  const result = await genres.find();
  res.send(result);
});

routes.get("/:id", validateObjectId, async (req, res) => {
  const result = await genres.findById(req.params.id);
  if (!result) return res.status(404).send("Data not found");
  res.send(result);
});

routes.post("/",  async (req, res) => {
  const { error } = genreValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const data = new genres({
    name: req.body.name,
  });
  const saveData = await data.save();
  res.send(saveData);
});

routes.put("/:id", async (req, res) => {
  const { error } = genreValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await genres.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!result) return res.status(404).send("data not found");

  res.send(result);
});

routes.delete("/:id", async (req, res) => {
  const result = await genres.findByIdAndRemove(req.params.id);
  if (!result) return res.status(404).send("data not found");

  res.send(result);
});
module.exports = routes;
