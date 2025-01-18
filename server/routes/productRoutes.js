const express = require('express');
const Product = require("../models/Product");
const cloudinary = require('cloudinary').v2;
const multer = require('multer'); // Import multer

const router = express.Router();

// Set up multer for handling image file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

// Create a new product with image upload

// Create a new product
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    // Check if the image is provided
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Log request body and file to verify
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    // Upload the image to Cloudinary using the file buffer
    cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
        }

        // Get the Cloudinary image URL
        const imageUrl = result.secure_url;

        // Parse videoGameDetails if it exists
        let videoGameDetails = req.body.videoGameDetails ? JSON.parse(req.body.videoGameDetails) : null;

        // Extract product details
        const { name, type, price, quantity } = req.body;

        // Validate for video_game type
        if (type === 'video_game') {
          if (!videoGameDetails || !videoGameDetails.console || !videoGameDetails.genre) {
            return res.status(400).json({ error: 'Missing video game details' });
          }
        }

        // Create a new product
        const newProduct = new Product({
          name,
          type,
          price,
          quantity,
          image: imageUrl, // Store Cloudinary image URL
          videoGameDetails,
        });

        // Save the product
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
      }
    ).end(req.file.buffer); // Call end() with the buffer as argument
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete product
router.delete('/delete/:id', async (req, res) => {
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
