const path = require('path');

const express = require('express');

const authorization = require('../middleware/authorization');
const adminController = require('../controllers/admin');

const router = express.Router();

// routes are accessible only if admin
router.get('/add-product',  authorization.isAdmin, adminController.getAddProduct);
router.post('/add-product', authorization.isAdmin, adminController.postAddProduct);
router.get('/edit-product/:productId', authorization.isAdmin, adminController.getEditProduct);
router.post('/edit-product', authorization.isAdmin, adminController.postEditProduct);

module.exports = router;
