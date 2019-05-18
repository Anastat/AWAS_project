const path = require('path');

const express = require('express');

const authorization = require('../middleware/authorization');
const shopController = require('../controllers/shop');

const router = express.Router();

// only user accessible routes
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
/*router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);*/

module.exports = router;
