const express = require('express');

const router = express.Router();

const likeController = require('../controllers/like_contorller');

router.post('/toggle', likeController.toggleLike)




module.exports = router;