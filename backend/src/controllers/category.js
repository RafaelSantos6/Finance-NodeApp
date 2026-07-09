const { Category } = require('../models');

class CategoryController {
    listar = async (req, res) => {
        try {
            const categorias = await Category.findAll();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar categorias" });
        }
    };

    buscarPorId = async (req, res) => {
        try {
            const categoria = await Category.findByPk(req.params.id);
            if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });
            res.json(categoria);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar categoria" });
        }
    };

    criar = async (req, res, transaction) => {
        try {
            const nova = await Category.create(req.body, {transaction});
            res.status(201).json(nova);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar categoria" });
        }
    };

    atualizar = async (req, res) => {
        try {
            const atualizado = await Category.update(req.body, {
                where: { id: req.params.id }
            });
            if (atualizado[0] === 0) return res.status(404).json({ error: "Categoria não encontrada" });
            res.json({ message: "Categoria atualizada com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar categoria" });
        }
    };

    remover = async (req, res) => {
        try {
            const removido = await Category.destroy({
                where: { id: req.params.id }
            });
            if (!removido) return res.status(404).json({ error: "Categoria não encontrada" });
            res.json({ message: "Categoria removida com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao remover categoria" });
        }
    };
}

module.exports = new CategoryController();