const PostRepository = require('../repository/PostRepository');


class PostController{
    async create(req, res) {
        try {
            const post = await PostRepository.create(req.body);
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