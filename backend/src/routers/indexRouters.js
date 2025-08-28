const express = require('express');
const postRoutes = require('./PostRouters');
const AdminRouter = require('./AdminRouters');
const cors = require('cors');

const router = express.Router();

router.use('/posts', postRoutes);
router.use('/admin', AdminRouter);

module.exports = router;