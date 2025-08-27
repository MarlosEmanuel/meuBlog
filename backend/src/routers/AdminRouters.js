const express = require('express');
const PostController = require('../controllers/PostController');
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const router = express.Router();

//Admin
router.post('/login',AdminController.login);


//Posts
router.post('/posts', authMiddleware, PostController.create);

module.exports = router;