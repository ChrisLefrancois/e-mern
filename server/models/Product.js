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
    category: {
      type: String,
      enum: ['tcg', 'sport'],
      required: function() { return this.type === 'card'; }
    },
    sport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sport',
      required: function() { return this.category === 'sport'; } // Required only if category is 'sport'
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tcg',
      required: function() { return this.category === 'tcg'; } // Required only if category is 'tcg'
    },
    set: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Set',
      required: function() { return this.category === 'tcg'; } // Required only if category is 'tcg'
    },
    isGraded: { type: Boolean },
  },
});

module.exports = mongoose.model('Product', productSchema);
