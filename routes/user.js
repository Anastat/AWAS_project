const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const authorization = require('../middleware/authorization');
const userController = require('../controllers/user');

const router = express.Router();

// only user accessible routes
router.get('/cart', authorization.isUser, userController.getCart);
router.post('/cart', authorization.isUser, userController.postCart);
router.post('/cart-delete-item', authorization.isUser, userController.postCartDeleteProduct);
router.get('/orders', authorization.isUser, userController.getOrders);
router.post('/orders', authorization.isUser, [
  body('total', 'Total should be a number').isFloat()
], userController.postOrder);

module.exports = router;
