const express = require('express');
const Tcg = require("../models/Tcg");

const router = express.Router();


router.post('/create', async (req, res) => {
const name = req.body;

try {
  const newTcg = new Tcg(name);
  await newTcg.save();

  res.status(201).json({ message: 'Tcg created successfully' });
} catch (error) {
  res.status(500).json({ message: 'Server error', error });
}
})


router.get('/', async (req, res) => {
  try {
    const tcgs = await Tcg.find();
    res.status(200).json(tcgs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
