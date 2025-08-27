const express = require('express');
const postRoutes = require('./PostRouters');

const router = express.Router();

router.use('/posts', postRoutes);

module.exports = router;