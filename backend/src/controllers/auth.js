const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    registrar = async (req, res, transaction) => {

        try {
            const { nome, email, senha } = req.body;

            const hashSenha = await bcrypt.hash(senha, 10);
            const user = await User.create({ nome, email, senha: hashSenha }, {transaction});

            user.senha = undefined;
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    };

    login = async (req, res) => {
        try {
            const { email, senha } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user || !(await bcrypt.compare(senha, user.senha))) {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'chave_secreta_padrao', {
                expiresIn: '1d',
            });

            res.json({ user: { id: user.id, nome: user.nome, email: user.email }, token });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    };
}

module.exports = new AuthController();