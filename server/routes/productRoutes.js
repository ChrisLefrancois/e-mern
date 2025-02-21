const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const sanitizeObjectIdFields = (obj, fields) => {
  fields.forEach(field => {
    const keys = field.split('.');
    let tempObj = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      tempObj = tempObj[keys[i]];
      if (!tempObj) return;
    }
    if (tempObj[keys[keys.length - 1]] === "") {
      tempObj[keys[keys.length - 1]] = null;
    }
  });
};

// Create a new product with image upload
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Invalid file type. Please upload an image.' });
    }

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { name, type, price, quantity } = req.body;
    if (!name || !type || !price || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let productData = { ...req.body };
    try {
      productData.videoGameDetails = JSON.parse(req.body.videoGameDetails || '{}');
      productData.cardDetails = JSON.parse(req.body.cardDetails || '{}');
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON format in details' });
    }

    const objectIdFields = [
      "videoGameDetails.console",
      "videoGameDetails.genre",
      "cardDetails.game",
      "cardDetails.set"
    ];
    sanitizeObjectIdFields(productData, objectIdFields);

    if (type === 'video_game' && (!productData.videoGameDetails.console || !productData.videoGameDetails.genre)) {
      return res.status(400).json({ error: 'Missing video game details' });
    }

    cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
      }

      productData.image = result.secure_url;

      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    }).end(req.file.buffer);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all products with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  try {
    const products = await Product.find().skip((page - 1) * limit).limit(limit);
    const totalProducts = await Product.countDocuments();
    res.json({ products, totalPages: Math.ceil(totalProducts / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }

    // Fetch the specific product
    const product = await Product.findById(req.params.id)
      .populate('videoGameDetails.console', 'name')
      .populate('videoGameDetails.genre', 'name')
      .populate('cardDetails.sport', 'name')
      .populate('cardDetails.game', 'name')
      .populate('cardDetails.set', 'name');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Define the query for related products
    let relatedProductsQuery = { _id: { $ne: product._id } }; // Exclude the current product

    // If the product is a video game, fetch other video games
    if (product.type === 'video_game') {
      relatedProductsQuery.type = 'video_game';
    }

    // If the product is a card, fetch other cards, considering the category (tcg or sport)
    if (product.type === 'card') {
      relatedProductsQuery.type = 'card';

      if (product.cardDetails.category === 'tcg') {
        relatedProductsQuery['cardDetails.category'] = 'tcg';
      } else if (product.cardDetails.category === 'sport') {
        relatedProductsQuery['cardDetails.category'] = 'sport';
      }
    }

    // Fetch related products based on the query
    const relatedProducts = await Product.find(relatedProductsQuery).limit(3);

    res.status(200).json({ product, relatedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete a product
router.delete('/delete/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting product', details: err.message });
  }
});

module.exports = router;
