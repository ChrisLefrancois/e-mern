const express = require('express');
const Product = require("../models/Product");

const router = express.Router();

// Create a new product
router.post('/create', async (req, res) => {
  try {
    const { name, type, price, quantity, image, videoGameDetails, cardDetails } = req.body;

    // Validate type
    if (!['video_game', 'card'].includes(type)) {
      return res.status(400).json({ error: 'Invalid product type' });
    }

    const newProduct = new Product({
      name,
      type,
      price,
      quantity,
      image,
    });

    // Add details based on type
    if (type === 'video_game') {
      if (!videoGameDetails || !videoGameDetails.console || !videoGameDetails.genre) {
        return res.status(400).json({ error: 'Missing video game details' });
      }
      newProduct.videoGameDetails = videoGameDetails;
    } else if (type === 'card') {
      if (!cardDetails || !cardDetails.category) {
        return res.status(400).json({ error: 'Missing card details' });
      }
      newProduct.cardDetails = cardDetails;
    }

    // Save product to database
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
