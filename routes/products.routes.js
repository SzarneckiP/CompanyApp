const express = require('express');
const router = express.Router();
const Products = require('../models/products.model');

router.get('/products', async (req, res) => {
  try {
    res.json(await Products.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Products.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const pro = await Products.findOne().skip(rand);
    if (!pro) res.status(404).json({ message: 'Not found..' });
    else res.json(pro);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const pro = await Products.findById(req.params.id);
    if (!pro) res.status(404).json({ message: ' Not found..' });
    else res.json(pro);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/products', async (req, res) => {
  const { name, client } = req.body;
  try {
    const newProduct = new Products({ name: name, client: client });
    await newProduct.save();
    res.json(newProduct);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;
  try {
    const pro = await (Products.findById(req.params.id));
    if (pro) {
      pro.name = name;
      pro.client = client;
      await pro.save();
      res.json(pro);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const pro = await (Products.findById(req.params.id));
    if (pro) {
      await Products.deleteOne({ _id: req.params.id });
      res.json(pro);
    }
    else res.status(404).json("Not found..");
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
