const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., RPG, Action, Adventure
});

module.exports = mongoose.model('Genre', GenreSchema);