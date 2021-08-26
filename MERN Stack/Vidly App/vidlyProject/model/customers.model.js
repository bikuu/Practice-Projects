const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  isGold: Boolean,
  name: { type: String, required: true },
  phone: String,
});

const customer = mongoose.model("customer", customerSchema);
module.exports = customer;
