const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AdminController {
    
    async login(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username e senha são obrigatórios' });
        }
        if (username === process.env.ADMIN_USER) {
            const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASS);

            if (isPasswordValid) {
                const token = jwt.sign(
                    { username },
                    process.env.JWT_SECRET,
                    { expiresIn: '365d' }
                );

                res.cookie('tokenDeSessao', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Use 'secure' em produção
                    sameSite: 'strict',
                    maxAge: 365 * 24 * 60 * 60 * 1000
                });
                return res.status(200).json({ message: 'Login bem-sucedido.' });
            }
        }
        
        // Se o username ou a senha não forem válidos, envie uma única resposta de erro.
        return res.status(401).send('Credenciais inválidas.');
    }
}

module.exports = new AdminController();