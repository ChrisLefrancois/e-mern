const express = require('express');
const Console = require("../models/Console");

const router = express.Router();


router.post('/create', async (req, res) => {
const name = req.body;

try {
  const newConsole = new Console(name);
  await newConsole.save();

  res.status(201).json({ message: 'Console created successfully' });
} catch (error) {
  res.status(500).json({ message: 'Server error', error });
}
})


router.get('/', async (req, res) => {
  try {
    const consoles = await Console.find();
    res.status(200).json(consoles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
