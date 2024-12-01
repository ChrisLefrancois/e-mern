const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the product
  type: { type: String, enum: ['video_game', 'card'], required: true }, // Product type
  price: { type: Number, required: true }, // Stored as cents
  quantity: { type: Number, required: true }, // Stock available
  image: { type: String }, // URL to the product image
  is_graded: { type: Boolean }, // Only for cards

  // Relations for Video Games
  console: { type: mongoose.Schema.Types.ObjectId, ref: 'Console' }, // Reference to Console model
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }, // Reference to Genre model

  // Relations for Cards
  card_type: { type: String, enum: ['tcg', 'sport'] },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Tcg' }, // For TCG cards
  set: { type: mongoose.Schema.Types.ObjectId, ref: 'Set' }, // For TCG cards
  sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport' }, // For Sports cards
});

// Export the model
module.exports = mongoose.model('Product', productSchema);
