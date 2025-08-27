const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;