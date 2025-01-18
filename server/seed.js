const mongoose = require('mongoose');
require('dotenv').config();

// Import your models
const Console = require('./models/Console');
const Genre = require('./models/Genre');
const Sport = require('./models/Sport');
const Tcg = require('./models/Tcg');
const Set = require('./models/Set');
const User = require('./models/User');
const Product = require('./models/Product'); // Assuming Product model is defined

// Connect to MongoDB
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
    await Product.deleteMany({}); // Make sure to clear the products if you want to reset

    // Create Consoles
    const consoles = await Console.insertMany([
      { name: 'PS5' },
      { name: 'Xbox Series X' },
      { name: 'Nintendo Switch' },
      { name: 'Game Boy Color' },
      { name: 'Gamecube' },
      { name: 'ps3' },
    ]);

    // Create Genres
    const genres = await Genre.insertMany([
      { name: 'RPG' },
      { name: 'Action' },
      { name: 'Adventure' },
    ]);

    // Create Sports
    const sport = await Sport.insertMany([
      { name: 'Basketball' },
      { name: 'Football' },
      { name: 'Baseball' },
      { name: 'Hockey' },
    ]);

    // Create Tcgs
    const tcgs = await Tcg.insertMany([
      { name: 'Pokémon' },
      { name: 'Magic: The Gathering' },
      { name: 'Yu-Gi-Oh' },
      { name: 'Star Wars Unlimited' },
    ]);

    // Create Sets
    const sets = await Set.insertMany([
      { name: 'Sun And Moon Promotional Cards', tcg: tcgs[0]._id }, // Referring to Pokémon
      { name: 'Zendikar Rising', tcg: tcgs[1]._id }, // Referring to Magic: The Gathering
      { name: 'Dominaria United', tcg: tcgs[1]._id }, // Referring to Magic: The Gathering
      { name: 'Shadow Of The Galaxy', tcg: tcgs[3]._id }, // Referring to Magic: The Gathering
      { name: 'Spark Of Rebellion', tcg: tcgs[3]._id }, // Referring to Magic: The Gathering
    ]);

    // Create Users
    const users = await User.insertMany([
      { email: "a@a.a", password: "123123", name: "bob" },
      { email: "chris@gmail.com", password: "123123", name: "chris", role: "admin" }
    ]);

    // Create Products and link to related models
    const products = await Product.insertMany([
      {
        name: 'The Legend of Zelda: Breath of the Wild',
        price: 59.99,
        quantity: 50,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737232012/zelda_breath_va5oj2.jpg',
        type: 'video_game',
        videoGameDetails: {
          console: consoles[2]._id, // Switch
          genre: genres[0]._id, // RPG
        },
      },
      {
        name: 'Pokémon Red',
        price: 29.99,
        quantity: 100,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737234460/pokemon_red_ttzuj2.png',
        type: 'video_game',
        videoGameDetails: {
          console: consoles[3]._id, // gb color
          genre: genres[0]._id, // rpg
        },
      },
      {
        name: 'Metroid Prime',
        price: 34.99,
        quantity: 1,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737232055/metroid_prime_qecebr.jpg',
        type: 'video_game',
        videoGameDetails: {
          console: consoles[4]._id, // gamecube
          genre: genres[1]._id, // action
        },
      },
      {
        name: 'Uncharted',
        price: 4.99,
        quantity: 1,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737234563/uncharted_aj8jeu.webp',
        type: 'video_game',
        videoGameDetails: {
          console: consoles[5]._id, // ps3
          genre: genres[1]._id, // action
        },
      },
      {
        name: 'Connor Bedard Young Guns',
        price: 599.99,
        quantity: 1,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737235010/bedard_Yg_u8wskr.jpg',
        type: 'card',
        cardDetails: {
          category: 'sport',
          sport: sport[3]._id,
          isGraded: false
        },
      },
      {
        name: 'Lane Hutson Young Guns',
        price: 129.99,
        quantity: 1,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737235060/hutson_YG_efuxga.webp',
        type: 'card',
        cardDetails: {
          category: 'sport',
          sport: sport[3]._id,
          isGraded: false
        },
      },
      {
        name: 'David Jiricek Future Watch Auto',
        price: 69.99,
        quantity: 1,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737235020/Jiricek_FWA_ps31oy.jpg',
        type: 'card',
        cardDetails: {
          category: 'sport',
          sport: sport[3]._id,
          isGraded: false
        },
      },
      {
        name: 'Paul Skenes Sapphire Selection Auto',
        price: 1700.00,
        quantity: 1,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737235152/skenes_hrklcg.jpg',
        type: 'card',
        cardDetails: {
          category: 'sport',
          sport: sport[2]._id,
          isGraded: false
        },
      },
      {
        name: 'Luke Skywalker - Jedi Knight - Spark of Rebellion -',
        price: 49.00,
        quantity: 1,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737235569/luke_gppjzf.jpg',
        type: 'card',
        cardDetails: {
          category: 'tcg',
          game: tcgs[3]._id,
          set: sets[4]._id,
          isGraded: false
        },
      },
      {
        name: 'Cad Bane Showcase - Shadow of the Galaxy - 276 -',
        price: 299.00,
        quantity: 1,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737235544/cad_bane_q8elkx.jpg',
        type: 'card',
        cardDetails: {
          category: 'tcg',
          game: tcgs[3]._id,
          set: sets[3]._id,
          isGraded: false
        },
      },
      {
        name: 'Charizard-GX - SM60 - Promo',
        price: 100.00,
        quantity: 1,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737235662/charizard_rcjc3n.webp',
        type: 'card',
        cardDetails: {
          category: 'tcg',
          game: tcgs[0]._id,
          set: sets[0]._id,
          isGraded: false
        },
      },
      {
        name: 'Sheoldred, the Apocalypse',
        price: 130.00,
        quantity: 1,
        image: 'https://res.cloudinary.com/do6peaqmu/image/upload/v1737235680/sheoldred_cl93oa.webp',
        type: 'card',
        cardDetails: {
          category: 'tcg',
          game: tcgs[1]._id,
          set: sets[2]._id,
          isGraded: false
        },
      },
    ]);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close(); // Close connection after seeding
  }
};

// Run the script
seedData();
