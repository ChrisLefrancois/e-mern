const express = require('express');
const Product = require("../models/Product");
const authenticateToken = require('../middleware/authenticateMiddleware');


const router = express.Router();

// Create a new product
router.post('/create', authenticateToken, async (req, res) => {
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


// Get a specific product by ID
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Find product by ID
    const product = await Product.findById(productId)
      .populate('videoGameDetails.console', 'name') // Populates console name
      .populate('videoGameDetails.genre', 'name')   // Populates genre name
      .populate('cardDetails.sport', 'name')       // Populates sport name (for cards)
      .populate('cardDetails.game', 'name')        // Populates game name (for TCG)
      .populate('cardDetails.set', 'name');        // Populates set name (for TCG)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
    console.log(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete product
router.delete('/delete/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting product', error: err.message });
  }
});

module.exports = router;
