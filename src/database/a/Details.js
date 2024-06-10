const express = require('express');
const router = express.Router();
const detailController = require('../controllers/DetailController');
router.get('/detail', detailController.getDetail );
router.get('/detailes', detailController.getDetailes);
router.get('/details', detailController.getDetails);
router.get('/seach', detailController.searchDetails);
router.get('/:id', detailController.getDetailById);



module.exports = router;