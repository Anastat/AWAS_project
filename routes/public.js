const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// visible to everyone routes
router.get('/', shopController.getIndex);
router.get('/products/:productId', shopController.getProduct);

module.exports = router;
