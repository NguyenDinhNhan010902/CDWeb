const express = require('express');
const router = express.Router();
const danhmucController = require('../controllers/danhmucController');

router.get('/', danhmucController.getDanhMuc);

module.exports = router;