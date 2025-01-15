const mongoose = require('mongoose');
require('dotenv').config();

// Import your models
const Console = require('./models/Console');
const Genre = require('./models/Genre');
const Sport = require('./models/Sport');
const Tcg = require('./models/Tcg');
const Set = require('./models/Set');
const User = require('./models/User');

// // Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Seed data
const seedData = async () => {
  try {
    // Clear existing data (optional)
    await Console.deleteMany({});
    await Genre.deleteMany({});
    await Sport.deleteMany({});
    await Tcg.deleteMany({});
    await Set.deleteMany({});
    await User.deleteMany({});

    // Create Consoles
    await Console.insertMany([
      { name: 'PS5' },
      { name: 'Xbox Series X' },
      { name: 'Nintendo Switch' },
    ]);

    // Create Genres
    await Genre.insertMany([
      { name: 'RPG' },
      { name: 'Action' },
      { name: 'Adventure' },
    ]);

    // Create Sports
    await Sport.insertMany([
      { name: 'Basketball' },
      { name: 'Football' },
      { name: 'Baseball' },
    ]);

    // Create Tcgs
    await Tcg.insertMany([
      { name: 'Pokémon' },
      { name: 'Magic: The Gathering' },
      { name: 'Yu-Gi-Oh' },
    ]);

    // Create Sets
    await Set.insertMany([
      { name: 'Base Set', tcg: 'ObjectId_of_Pokémon' },
      { name: 'Zendikar Rising', tcg: 'ObjectId_of_Magic' },
    ]);

    await User.insertMany([
      {email: "a@a.a", password: "123123", name: "bob" },
      {email: "chris@gmail.com", password: "123123", name: "chris", role: "admin" }
    ])

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close(); // Close connection after seeding
  }
};

// Run the script
seedData();
