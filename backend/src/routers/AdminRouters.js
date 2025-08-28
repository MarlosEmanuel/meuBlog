const express = require('express');
const PostController = require('../controllers/PostController');
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const {upload} = require('../middlewares/uploadMiddleware');
const router = express.Router();

//Admin
router.post('/login',AdminController.login);

//Posts
router.post('/posts',authMiddleware, upload,PostController.create);
router.delete('/posts/:id', authMiddleware, PostController.deleteById);
router.get('/check-auth', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Usuário autenticado.' });
});
router.post('/logout', authMiddleware,(req,res)=>{
    res.clearCookie('tokenDeSessao');
    res.status(200).json({ message: 'Logout bem-sucedido.' });
});

module.exports = router;