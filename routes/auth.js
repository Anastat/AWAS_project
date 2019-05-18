const express = require('express');

const authorization = require('../middleware/authorization');
const authController = require('../controllers/auth');
const notLog = authorization.notLoggedIn;
const isLog = authorization.isLoggedIn;

const router = express.Router();


router.post('/logout', authController.postLogout);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);

module.exports = router;