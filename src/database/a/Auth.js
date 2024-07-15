const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/verify', authController.verify);

// router.post('/logout', authController.logout);
module.exports = router;