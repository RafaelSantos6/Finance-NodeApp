const { Expense, Category } = require('../models');
const { Op } = require('sequelize');

class ExpenseController {

    listar = async (req, res) => {
        try {
            const {
                status,
                categoria,
                dataInicio,
                dataFim,
                valorMin,
                valorMax
            } = req.query;

            const whereClause = {
                usuarioId: req.userId
            };

            if (status)
                whereClause.status = status;

            if (categoria)
                whereClause.categoriaId = categoria;

            // filtro por valor
            if (valorMin || valorMax) {
                whereClause.valor = {};

                if (valorMin)
                    whereClause.valor[Op.gte] = valorMin;

                if (valorMax)
                    whereClause.valor[Op.lte] = valorMax;
            }

            // filtro por período
            if (dataInicio || dataFim) {
                whereClause.data = {};

                if (dataInicio)
                    whereClause.data[Op.gte] = dataInicio;

                if (dataFim)
                    whereClause.data[Op.lte] = dataFim;
            }

            const despesas = await Expense.findAll({
                where: whereClause,
                include: [
                    {
                        model: Category,
                        as: 'categoria'
                    }
                ]
            });

            return res.json(despesas);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Erro ao buscar despesas'
            });
        }
    };

    buscarPorId = async (req, res) => {
        try {

            const despesa = await Expense.findOne({
                where: {
                    id: req.params.id,
                    usuarioId: req.userId
                },
                include: [
                    {
                        model: Category,
                        as: 'categoria'
                    }
                ]
            });

            if (!despesa) {
                return res.status(404).json({
                    error: 'Despesa não encontrada'
                });
            }

            return res.json(despesa);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Erro ao buscar despesa'
            });
        }
    };

    criar = async (req, res) => {
        try {
            

            const {
                descricao,
                valor,
                data,
                status,
                categoriaId
            } = req.body;

            const categoria = await Category.findByPk(categoriaId);

            if (!categoria) {
                return res.status(404).json({
                    error: 'Categoria não encontrada'
                });
            }

            const despesa = await Expense.create({
                descricao,
                valor,
                data,
                status,
                categoriaId,
                usuarioId: req.userId
            });

            return res.status(201).json(despesa);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: error.message
            });
        }
    };

    atualizar = async (req, res) => {
        try {

            const despesa = await Expense.findOne({
                where: {
                    id: req.params.id,
                    usuarioId: req.userId
                }
            });

            if (!despesa) {
                return res.status(404).json({
                    error: 'Despesa não encontrada'
                });
            }

            await despesa.update(req.body);

            return res.json({
                message: 'Despesa atualizada com sucesso',
                despesa
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Erro ao atualizar despesa'
            });
        }
    };

    remover = async (req, res) => {
        try {

            const despesa = await Expense.findOne({
                where: {
                    id: req.params.id,
                    usuarioId: req.userId
                }
            });

            if (!despesa) {
                return res.status(404).json({
                    error: 'Despesa não encontrada'
                });
            }

            await despesa.destroy();

            return res.json({
                message: 'Despesa removida com sucesso'
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: 'Erro ao remover despesa'
            });
        }
    };
}

module.exports = new ExpenseController();