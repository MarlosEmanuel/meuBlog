require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const connectDB = require('./src/config/db');
const index = require('./src/routers/indexRouters');
const app = express();
const port = 8080;


const corsOptions = {
    origin: 'http://localhost:5173', // A origem do seu frontend
    credentials: true // Essencial para permitir o uso de cookies
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('./public'));

connectDB();

app.use('/api', index);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});