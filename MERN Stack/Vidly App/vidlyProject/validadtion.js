const joi = require("joi");

function regValidation(data) {
  const schema = joi.object({
    name: joi.string().min(5).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  return schema.validate(data);
}

function loginValidation(data) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  return schema.validate(data);
}

function genreValidation(data) {
  const schema = joi.object({
    name: joi.string().min(5).required(),
  });

  return schema.validate(data);
}

function customerValidation(data) {
  const schema = joi.object({
    name: joi.string().min(5).required(),
    phone: joi.string().min(7).required(),
  });

  return schema.validate(data);
}

function movieValidation(data) {
  const schema = joi.object({
    title: joi.string().min(5).required(),
    genreId: joi.objectId().required(),
    numberInStock: joi.number().min(0).required(),
    dailyRentalRate: joi.number().min(0).required(),
  });

  return schema.validate(data);
}

function rentalValidation(data) {
  const schema = joi.object({
    customerId: joi.objectId().required(),
    movieId: joi.objectId().required(),
  });

  return schema.validate(data);
}
module.exports = {
  genreValidation,
  customerValidation,
  movieValidation,
  rentalValidation,
  regValidation,
  loginValidation
};
