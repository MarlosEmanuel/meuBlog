const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies.tokenDeSessao;

    if (!token) {
        // Se não houver token, o acesso não é autorizado.
        return res.status(401).json({ message: 'Não autorizado: Token não fornecido.' });
    }

    try {
        // Apenas verifica o token. Não armazena o payload em `req.user`.
        jwt.verify(token, process.env.JWT_SECRET);
        
        // Se a verificação for bem-sucedida, a sessão é válida.
        next();
    } catch (err) {
        // Trata os diferentes tipos de erro do JWT para respostas mais claras.
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Não autorizado: Sua sessão expirou.' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Não autorizado: Token inválido.' });
        } else {
            return res.status(401).json({ message: 'Não autorizado: Falha na validação do token.' });
        }
    }
}

module.exports = authMiddleware;