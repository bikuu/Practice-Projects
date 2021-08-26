const mongoose = require("mongoose");
const {genresSchema} = require('./genres.model');
const movieSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true,
      trime: true,
      minlength: 5,
      maxlength: 255
  },
  genre: {
      type: genresSchema,
      required: true
  },
  numberInStock: { type: Number,
     required: true,
     min:0,
     max: 255
    },
  dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255
  },
});

const Movie = mongoose.model("movie", movieSchema);
module.exports = Movie;
