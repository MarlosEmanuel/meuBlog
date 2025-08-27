require('dotenv').config();
const bcrypt = require('bcrypt');
const password = process.env.ADMIN_PASS;
const saltRounds = 16;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Este é o seu hash. Copie-o para o seu arquivo .env:');
    console.log(hash);
});