const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Basketball, Football
});

module.exports = mongoose.model('Sport', SportSchema);
