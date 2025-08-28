const Post = require('../models/Post');

class PostRepository {
    
    async create(postData) {
        try{
            return await Post.create(postData);
        }catch(err){
            throw new Error(`Erro ao criar post: ${err.message}`);
        }
    }

    async findAll(){
        try{
            return await Post.find();
        }catch(err){
            throw new Error(`Erro ao buscar posts: ${err.message}`);
        }
    }

    async deleteById(postId){
        try{
            return await Post.findByIdAndDelete(postId);
        }catch(err){
            throw new Error(`Erro ao deletar post: ${err.message}`);
        }
    }
}

module.exports = new PostRepository();