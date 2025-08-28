const express = require('express');
const PostController = require('../controllers/PostController');

const router = express.Router();

router.get('/',PostController.findAll);

module.exports = router;