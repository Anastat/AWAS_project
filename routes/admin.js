const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const authorization = require('../middleware/authorization');
const adminController = require('../controllers/admin');

const router = express.Router();

// routes are accessible only if admin
router.get('/add-product',  authorization.isAdmin, adminController.getAddProduct);
router.get('/edit-product/:productId', authorization.isAdmin, adminController.getEditProduct);

// post routes has validators 
router.post('/add-product', authorization.isAdmin, [
  body('title', 'Title is required').not().isEmpty(),
  body('imageUrl', 'Image URL should be a valid URL').isURL(),
  body('price', 'Price should be a positive number').isFloat({min: 0})
], adminController.postAddProduct);
router.post('/edit-product', authorization.isAdmin, [
  body('title', 'Title is required').not().isEmpty(),
  body('imageUrl', 'Image URL should be a valid URL').isURL(),
  body('price', 'Price should be a positive number').isFloat({min: 0})
], adminController.postEditProduct);

module.exports = router;
