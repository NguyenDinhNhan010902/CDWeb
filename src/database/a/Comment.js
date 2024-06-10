const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');
router.get('/add', commentController.addComment );

module.exports = router;