const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class AuthController {

    registrar = async (req, res) => {
        try {
            const { nome, email, senha } = req.body;

            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                return res.status(400).json({ error: "Email já cadastrado" });
            }

            // Criptografa a senha antes de salvar
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senha, salt);

            const novoUser = await User.create({ nome, email, senha: senhaHash });

            res.status(201).json({ 
                id: novoUser.id, 
                nome: novoUser.nome, 
                email: novoUser.email 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao registrar usuário" });
        }
    };

    // Login do Usuário
    login = async (req, res) => {
        try {
            const { email, senha } = req.body;

            // Busca o usuário pelo email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }

            // Compara a senha digitada com a criptografada no banco
            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                return res.status(401).json({ error: "Senha inválida" });
            }

            // Gera o Token JWT válido por 1 dia
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            res.json({ 
                token, 
                usuario: { id: user.id, nome: user.nome, email: user.email } 
            });
        } catch (error) {
            res.status(500).json({ error: "Erro ao fazer login" });
        }
    };
}

module.exports = new AuthController();