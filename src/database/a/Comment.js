const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');
router.post('/add', commentController.addComment );
router.get('/getcomment', commentController.getComment );

module.exports = router;