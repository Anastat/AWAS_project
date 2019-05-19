const path = require('path');

const express = require('express');

const authorization = require('../middleware/authorization');
const userController = require('../controllers/user');

const router = express.Router();

// only user accessible routes
router.get('/cart', authorization.isUser, userController.getCart);
router.post('/cart', authorization.isUser, userController.postCart);
router.post('/cart-delete-item', authorization.isUser, userController.postCartDeleteProduct);
/*router.get('/orders', userController.getOrders);
router.get('/checkout', userController.getCheckout);*/

module.exports = router;
