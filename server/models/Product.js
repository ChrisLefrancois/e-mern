const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['video_game', 'card'] },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
  videoGameDetails: {
    console: { type: mongoose.Schema.Types.ObjectId, ref: 'Console' },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  },
  cardDetails: {
    category: { type: String, enum: ['tcg', 'sport'] },
    sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport' }, // For sport cards
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }, // For TCG cards
    set: { type: mongoose.Schema.Types.ObjectId, ref: 'Set' }, // For TCG cards
    isGraded: { type: Boolean },
  },
});

module.exports = mongoose.model('Product', productSchema);
