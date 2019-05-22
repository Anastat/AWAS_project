const path = require('path');

const express = require('express');

const publicController = require('../controllers/public');

const router = express.Router();

// visible to everyone routes
router.get('/', publicController.getIndex);
router.get('/products', publicController.getProduct);
router.get('/report', publicController.getReportPage);
router.post('/report', publicController.postReportPage);

module.exports = router;
