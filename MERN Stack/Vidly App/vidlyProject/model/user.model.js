const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: Boolean
});

//generate the jwt token using below method and apply it on user routes
// and req id and isadmin 
// property is used for validadtion.
registerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.tokenKey);
  return token;
};
const Register = mongoose.model("User", registerSchema);

module.exports = Register;
