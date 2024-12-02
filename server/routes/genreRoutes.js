const express = require('express');
const Genre = require("../models/Genre");

const router = express.Router();


router.post('/create', async (req, res) => {
const name = req.body;

try {
  const newGenre = new Genre(name);
  await newGenre.save();

  res.status(201).json({ message: 'Genre created successfully' });
} catch (error) {
  res.status(500).json({ message: 'Server error', error });
}
})


router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
