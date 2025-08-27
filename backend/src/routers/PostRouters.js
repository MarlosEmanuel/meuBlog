const express = require('express');
const PostController = require('../controllers/PostController');
const cors = require('cors');

const router = express.Router();

router.get('/',cors({origin: 'http://localhost:5173'}),PostController.findAll);

module.exports = router;