const { Expense, Category, sequelize } = require('../models');

class DashboardController {
    totalGastos = async (req, res) => {
        try {
            const total = await Expense.sum('valor', { where: { usuarioId: req.userId } });
            res.json({ total: total || 0 });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao calcular total' });
        }
    };

    quantidade = async (req, res) => {
        try {
            const quantidade = await Expense.count({ where: { usuarioId: req.userId } });
            res.json({ quantidade });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao contar despesas' });
        }
    };

    gastosPorCategoria = async (req, res) => {
        try {
            const estatisticas = await Expense.findAll({
                where: { usuarioId: req.userId },
                attributes: [
                    [sequelize.col('categoria.nome'), 'categoria'],
                    [sequelize.fn('SUM', sequelize.col('valor')), 'total']
                ],
                include: [{
                    model: Category,
                    as: 'categoria',
                    attributes: []
                }],
                group: ['categoriaId']
            });
            res.json(estatisticas);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro ao gerar estatísticas por categoria' });
        }
    };
}

module.exports = new DashboardController();