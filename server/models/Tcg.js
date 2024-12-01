const mongoose = require('mongoose');

const TcgSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Pokémon, Yu-Gi-Oh, Magic: The Gathering
});

module.exports = mongoose.model('Tcg', TcgSchema);
