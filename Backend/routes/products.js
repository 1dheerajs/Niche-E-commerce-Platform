const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('artisan', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Add product (Artisan only)
router.post('/', auth, async (req, res) => {
  const { name, description, price, image, category } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'artisan' && user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      artisan: req.user.id
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });

  }
});

module.exports = router;
