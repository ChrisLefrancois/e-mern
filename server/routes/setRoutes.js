const express = require('express');
const Set = require("../models/Set");

const router = express.Router();


router.post('/create', async (req, res) => {
const name = req.body;

try {
  const newSet = new Set(name);
  await newSet.save();

  res.status(201).json({ message: 'Set created successfully' });
} catch (error) {
  res.status(500).json({ message: 'Server error', error });
}
})


router.get('/', async (req, res) => {
  try {
    const sets = await Set.find();
    res.status(200).json(sets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
