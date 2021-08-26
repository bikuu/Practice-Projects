const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/register",  async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    profilePicture: req.body.profilePicture,
    coverPicture: req.body.coverPicture,
  });
  await user.save();

  res.send({
    message: `${user.username} is registered successfully`,
    data: user,
  });
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("Username or Password Wrong");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(404).send("Username or Password Wrong");
    const token = user.generateAuthtoken();
    res.status(200).send({
      message: `${user.username} logged in successfully`,
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
