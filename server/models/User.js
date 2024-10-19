const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Trims whitespace from the input
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures each email is unique
    lowercase: true, // Converts email to lowercase
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for security
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Different user roles (you can add more if needed)
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Export the model
module.exports = mongoose.model('User', userSchema);
