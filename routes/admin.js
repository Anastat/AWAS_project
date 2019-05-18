const path = require('path');

const express = require('express');

const authorization = require('../middleware/authorization');
const adminController = require('../controllers/admin');

const router = express.Router();

// routes are accessible only if admin
router.get('/add-product',  adminController.getAddProduct);
router.get('/products',     adminController.getProducts);
router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

module.exports = router;
