
const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    name: {
        type:String,
        minlength:5,
        maxlength:50
    }
});

const genres = mongoose.model('genre', genresSchema);
module.exports = genres;
module.exports.genresSchema = genresSchema;