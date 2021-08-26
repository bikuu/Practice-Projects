const express = require("express");
const routes = express.Router();
const Customer = require("../model/customers.model");
const { customerValidation } = require("../validadtion");

routes.get("/", async (req, res) => {
  const result = await Customer.find();
  res.send(result);
});

routes.get("/:id", async (req, res) => {
  const result = await Customer.findById(req.params.id);
  if (!result) return res.status(404).send("Data not found");
  res.send(result);
});

routes.post("/", async (req, res) => {
  const data = new Customer({
    isGold: false,
    name: req.body.name,
    phone: req.body.phone,
  });
  const saveData = await data.save();
  res.send(saveData);
});

routes.put("/:id", async (req, res) => {
  const { error } = customerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await Customer.findByIdAndUpdate(
    req.params.id,
    { isGold: req.body.isGold, name: req.body.name, phone: req.body.phone },
    { new: true }
  );
  if (!result) return res.status(404).send("data not found");

  res.send(result);
});

routes.delete("/:id", async (req, res) => {
  const result = await Customer.findByIdAndRemove(req.params.id);
  if (!result) return res.status(404).send("data not found");

  res.send(result);
});
module.exports = routes;
