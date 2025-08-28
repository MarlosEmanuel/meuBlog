const PostRepository = require('../repository/PostRepository');
const path = require('path');

class PostController{
    async create(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'Nenhum arquivo de imagem enviado.' });
            }
            const { titulo, conteudo } = req.body;
            const fullPath = req.file.path; 
            const imgPath = path.normalize(fullPath).replace('public/', '');

            const novoPost = {
                titulo,
                conteudo,
                img: imgPath
            };

            const post = await PostRepository.create(novoPost);
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const posts = await PostRepository.findAll();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PostController();