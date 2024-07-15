const express = require('express');
const router = express.Router();
const detailController = require('../controllers/DetailController');
router.get('/detail', detailController.getDetail );
router.get('/detailes', detailController.getDetailes);
router.get('/details', detailController.getDetails);
router.get('/seach', detailController.searchDetails);
router.get('/history', detailController.getHistory)
router.get('/relatedNews', detailController.getDetailNew);
router.get('/:id', detailController.getDetailById);

router.post('/addhistory', detailController.addHistory);








module.exports = router;