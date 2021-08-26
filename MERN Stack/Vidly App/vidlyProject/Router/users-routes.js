const express = require("express");
const routes = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const _ = require("lodash");
const Register = require("../model/user.model");
const { regValidation, loginValidation } = require("../validadtion");

routes.get("/me", auth, async (req, res) => {
  // get current logge in user data using authorixation (req.user._id)
  const result = await Register.findById(req.user._id).select("-password");
  res.send(result);
});

routes.post("/register", async (req, res) => {
  const { error } = regValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const verifyUser = await Register.findOne({ email: req.body.email });
  if (verifyUser) return res.status(400).send("User already exists");

  const data = new Register(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  const saveData = await data.save();

  //getToken from User model using method funtion
  const token = data.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(saveData, ["name", "email"]));
});

routes.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const verifyUser = await Register.findOne({ email: req.body.email });
  if (!verifyUser) return res.status(400).send("Invalid Email or password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    verifyUser.password
  );
  if (!validPassword) return res.status(400).send("Invalid Email or password");

  const token = verifyUser.generateAuthToken();
  res.send(token);
});

routes.put("/:id", async (req, res) => {
  const { error } = regValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await Register.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, email: req.body.email, password: req.body.password },
    { new: true }
  );
  if (!result) return res.status(404).send("data not found");

  res.send(result);
});

routes.delete("/:id", async (req, res) => {
  const result = await Register.findByIdAndRemove(req.params.id);
  if (!result) return res.status(404).send("data not found");

  res.send(result);
});
module.exports = routes;
