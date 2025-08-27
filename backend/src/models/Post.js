const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    conteudo: { type: String, required: true },
    img: { type: String, required: false },
    dataCriacao: { type: Date, default: Date.now },
},{
    versionKey: false
});

module.exports = mongoose.model('Post', postSchema);