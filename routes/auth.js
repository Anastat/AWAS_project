const express = require('express');

const authorization = require('../middleware/authorization');
const authController = require('../controllers/auth');
const notLog = authorization.notLoggedIn;
const isLog = authorization.isLoggedIn;

const router = express.Router();


router.post('/logout', isLog,  authController.postLogout);
router.post('/login',  notLog, authController.postLogin);
router.post('/signup', notLog, authController.postSignup);
router.get('/login',   notLog, authController.getLogin);
router.get('/signup',  notLog, authController.getSignup);

module.exports = router;