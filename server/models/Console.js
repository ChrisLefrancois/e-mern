const mongoose = require('mongoose');

const ConsoleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., PS5, Xbox, Nintendo Switch
});

module.exports = mongoose.model('Console', ConsoleSchema);
