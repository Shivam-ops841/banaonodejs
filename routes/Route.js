const express = require('express');
const router = express.Router();
const userController = require('../controllers/Controller');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);

module.exports = router;
