require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./src/config/db');
const index = require('./src/routers/indexRouters');
const app = express();
const port = 8080;

app.use(express.json());
connectDB();

app.use('/api', index);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});