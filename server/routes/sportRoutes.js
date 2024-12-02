const express = require('express');
const Sport = require("../models/Sport");

const router = express.Router();


router.post('/create', async (req, res) => {
const name = req.body;

try {
  const newSport = new Sport(name);
  await newSport.save();

  res.status(201).json({ message: 'Sport created successfully' });
} catch (error) {
  res.status(500).json({ message: 'Server error', error });
}
})


router.get('/', async (req, res) => {
  try {
    const sports = await Sport.find();
    res.status(200).json(sports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
