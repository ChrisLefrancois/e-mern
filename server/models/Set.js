const mongoose = require('mongoose');

const SetSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Base Set, Zendikar Rising
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Tcg' }, // Link to a specific game
});

module.exports = mongoose.model('Set', SetSchema);
