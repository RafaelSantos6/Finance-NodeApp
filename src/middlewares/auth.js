const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = authHeader.split(' ');

    try {
        //descriptografa o token e extrai o ID do usuário
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.usuarioId = decoded.id; 
        
        return next(); 
    } catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};