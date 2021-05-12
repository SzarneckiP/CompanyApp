const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/products', productsController.getAll);

router.get('/products/random', productsController.getRandom);

router.get('/products/:id', productsController.getById);

router.post('/products', productsController.post);

router.put('/products/:id', productsController.update);

router.delete('/products/:id', productsController.delete);

module.exports = router;
